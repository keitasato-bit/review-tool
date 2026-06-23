import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getShopById } from "@/lib/shops";
import type { ShopData } from "@/lib/types";

type RequestBody = {
  shopId: string;
  selectedOptionsByCategory: Record<string, string[]>;
  freeText: string;
};

// 業種・視点を問わず共通の口コミ生成ルール
const SHARED_RULES = `- 文体は丁寧語（です・ます調）
- 120〜220文字を目安にする
- 自然で読みやすい日本語にする
- 誇大表現は禁止（「完治」「必ず」「絶対」「一回で治る」などは使わない）
- 口コミ文のみを出力する（見出しや説明文は不要）
- 「」などの括弧で囲まない`;

// 業種（businessType）と視点（audience）に応じて system プロンプトを切り替える
function buildSystemPrompt(shop: ShopData): string {
  if (shop.businessType === "houkan") {
    if (shop.audience === "referral-partner") {
      return `あなたは訪問看護ステーションのGoogle口コミ文章を作成するアシスタントです。
この口コミは、連携先の医療機関スタッフ（ケアマネジャー・病院の退院支援担当・訪問診療スタッフ・他の訪問看護ステーションなど）が、連携パートナーの立場で書くものです。患者・利用者本人やその家族の目線ではありません。
「来院」「施術」「受診」など患者目線の語彙は使わず、報告・連絡・相談のスムーズさ、多職種連携のしやすさ、専門職としての対応力など、専門職同士の連携を評価する視点で書いてください。
以下のルールに従って口コミ文を生成してください。

${SHARED_RULES}`;
    }
    return `あなたは訪問看護ステーションのGoogle口コミ文章を作成するアシスタントです。
訪問看護を受けた利用者本人やその家族の目線で書きます。「施術」「来院」ではなく「訪問」「看護」「ケア」などの語彙を使い、在宅での療養を支えてもらった体験として自然な口コミを作成してください。
以下のルールに従って口コミ文を生成してください。

${SHARED_RULES}`;
  }

  // 整体院（seitai）。未知の業種が来た場合もこちらをデフォルトとする。
  return `あなたは整体院のGoogle口コミ文章を作成するアシスタントです。
来院した患者・利用者の目線で、施術や来院体験についての自然な口コミを作成してください。
以下のルールに従って口コミ文を生成してください。

${SHARED_RULES}`;
}

// 選択もフリーテキストもない場合のフォールバック指示文（業種・視点に合わせる）
function buildFallbackUserContent(shop: ShopData): string {
  if (shop.businessType === "houkan") {
    if (shop.audience === "referral-partner") {
      return "特に選択内容はありませんが、連携先の医療機関スタッフの立場から、この訪問看護ステーションとの連携についての一般的な感想として口コミ文を作成してください。";
    }
    return "特に選択内容はありませんが、訪問看護ステーションを利用した一般的な感想として口コミ文を作成してください。";
  }
  return "特に選択内容はありませんが、整体院の一般的な感想として口コミ文を作成してください。";
}

function buildSelectedSummary(
  shop: ShopData,
  selectedOptionsByCategory: Record<string, string[]>
): string {
  const lines: string[] = [];
  for (const category of shop.categories) {
    const selectedIds = selectedOptionsByCategory[category.id] ?? [];
    if (selectedIds.length === 0) continue;
    const labels = category.options
      .filter((opt) => selectedIds.includes(opt.id))
      .map((opt) => opt.label);
    if (labels.length > 0) {
      lines.push(`【${category.label}】${labels.join("、")}`);
    }
  }
  return lines.join("\n");
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY が設定されていません。" },
      { status: 500 }
    );
  }

  let body: RequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "リクエストの形式が不正です。" }, { status: 400 });
  }

  const { shopId, selectedOptionsByCategory, freeText } = body;

  const shop = getShopById(shopId);
  if (!shop) {
    return NextResponse.json({ error: "店舗が見つかりません。" }, { status: 404 });
  }

  const selectedSummary = buildSelectedSummary(shop, selectedOptionsByCategory);

  const userContent = selectedSummary
    ? `以下の選択内容をもとに口コミ文を作成してください。\n\n${selectedSummary}${
        freeText.trim() ? `\n\n【その他・自由記述】\n${freeText.trim()}` : ""
      }`
    : freeText.trim()
    ? `以下の内容をもとに口コミ文を作成してください。\n\n${freeText.trim()}`
    : buildFallbackUserContent(shop);

  const client = new Anthropic({ apiKey });

  console.log("[generate-review] shopId:", shopId);
  console.log("[generate-review] apiKey prefix:", apiKey.slice(0, 20));
  console.log("[generate-review] userContent:", userContent.slice(0, 100));

  try {
    const response = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 512,
      system: buildSystemPrompt(shop),
      messages: [{ role: "user", content: userContent }],
    });

    const textBlock = response.content.find((b) => b.type === "text");
    const reviewText = textBlock && textBlock.type === "text" ? textBlock.text.trim() : "";

    return NextResponse.json({ reviewText });
  } catch (error) {
    if (error instanceof Anthropic.AuthenticationError) {
      console.error("[generate-review] AuthenticationError:", error.status, error.message);
      return NextResponse.json(
        { error: "APIキーが無効です。.env.local を確認してください。" },
        { status: 401 }
      );
    }
    if (error instanceof Anthropic.RateLimitError) {
      console.error("[generate-review] RateLimitError:", error.status, error.message);
      return NextResponse.json(
        { error: "APIのレート制限に達しました。しばらくしてから再試行してください。" },
        { status: 429 }
      );
    }
    if (error instanceof Anthropic.APIError) {
      console.error("[generate-review] APIError:", error.status, error.message);
      return NextResponse.json(
        { error: `APIエラーが発生しました（${error.status}）。` },
        { status: 500 }
      );
    }
    console.error("[generate-review] UnknownError:", error);
    return NextResponse.json(
      { error: "予期しないエラーが発生しました。" },
      { status: 500 }
    );
  }
}

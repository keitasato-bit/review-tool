import type { ShopData } from "./types";

type GenerateReviewTextArgs = {
  shop: ShopData;
  selectedOptionsByCategory: Record<string, string[]>;
  freeText: string;
};

// カテゴリIDから選択ラベルを取得する
function getSelectedLabels(
  shop: ShopData,
  selectedOptionsByCategory: Record<string, string[]>
): Record<string, string[]> {
  const result: Record<string, string[]> = {};
  for (const category of shop.categories) {
    const selectedIds = selectedOptionsByCategory[category.id] ?? [];
    if (selectedIds.length === 0) continue;
    const labels = category.options
      .filter((opt) => selectedIds.includes(opt.id))
      .map((opt) => opt.label);
    if (labels.length > 0) {
      result[category.id] = labels;
    }
  }
  return result;
}

export function generateReviewText({
  shop,
  selectedOptionsByCategory,
  freeText,
}: GenerateReviewTextArgs): string {
  const selected = getSelectedLabels(shop, selectedOptionsByCategory);
  const parts: string[] = [];

  // 来店理由
  const visitReason = selected["visit-reason"]?.[0];
  if (visitReason) {
    parts.push(`${visitReason}ため、こちらに伺いました。`);
  }

  // カウンセリング・説明
  const counseling = selected["counseling"]?.[0];
  if (counseling) {
    parts.push(`${counseling}ので、安心して相談できました。`);
  }

  // 接客対応
  const hospitality = selected["hospitality"]?.[0];
  if (hospitality) {
    parts.push(`${hospitality}ので、リラックスして過ごせました。`);
  }

  // 施術の印象
  const treatment = selected["treatment"]?.[0];
  if (treatment) {
    parts.push(`施術は${treatment}。`);
  }

  // 施術後の感想
  const afterTreatment = selected["after-treatment"]?.[0];
  if (afterTreatment) {
    parts.push(`施術後は${afterTreatment}。`);
  }

  // 院内の雰囲気
  const atmosphere = selected["atmosphere"]?.[0];
  if (atmosphere) {
    parts.push(`院内は${atmosphere}。`);
  }

  // 予約・来店しやすさ
  const accessibility = selected["accessibility"]?.[0];
  if (accessibility) {
    parts.push(`${accessibility}のも良かったです。`);
  }

  // おすすめしたい相手
  const recommend = selected["recommend"]?.[0];
  if (recommend) {
    parts.push(`${recommend}にもおすすめしたいと思います。`);
  }

  // 自由記述を末尾付近に挿入
  if (freeText.trim()) {
    parts.push(freeText.trim());
  }

  // 選択なしの場合は汎用文
  if (parts.length === 0) {
    return "丁寧に対応していただき、院内も清潔で落ち着いた雰囲気でした。安心して施術を受けられましたので、また利用したいと思います。";
  }

  let text = parts.join("");

  // 文字数調整
  const { minLength, maxLength } = shop.settings;

  // 長すぎる場合は後ろから削る
  if (text.length > maxLength) {
    // 文末句点で切れる位置を探す
    let cutIndex = maxLength;
    for (let i = maxLength; i >= minLength; i--) {
      if (text[i] === "。") {
        cutIndex = i + 1;
        break;
      }
    }
    text = text.slice(0, cutIndex);
  }

  // 短すぎる場合は締め文を追加
  if (text.length < minLength) {
    const closing = "また機会があればぜひ伺いたいと思います。";
    if (!text.endsWith(closing)) {
      text = text + closing;
    }
    // それでも短い場合はさらに補足
    if (text.length < minLength) {
      text = text + "丁寧な対応に感謝しています。";
    }
  }

  return text;
}

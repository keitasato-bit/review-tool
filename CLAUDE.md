# CLAUDE.md

このリポジトリで作業を始める前に最初に読むドキュメントです。プロジェクトの全体像・データ構成・運用ルールをまとめています。

## プロジェクト概要

整体院・訪問看護・クリニック向けの **Google口コミ作成補助ツール**です。

患者・利用者がQRコードなどから各店舗・施設の専用ページにアクセスし、用意された項目（チェック項目や満足度）を選ぶと、自然な口コミ文の下書きが生成されます。生成された文章をワンタップでコピーし、そのままGoogleの口コミ投稿画面へ遷移できます。

口コミ文の生成方法は業種で2系統あります。

- **整体院・訪問看護（`/shop/...`）**：選択内容を `app/api/generate-review/route.ts` に送り、Anthropic API（`claude-haiku-4-5`）で口コミ文を生成する。system プロンプトは業種（`businessType`）と視点（`audience`）に応じて切り替わる（後述）。
- **クリニック（`/clinic/...`）**：`lib/clinic-review-generator.ts` のローカルロジック（API非依存）で満足度の選択から口コミ文を生成する。このAPIルートは使わない。

## 技術構成

- **Next.js 14（App Router）**
- **TypeScript**
- **Tailwind CSS**
- DBなし。状態管理・フォーム・UIライブラリは未使用（Reactの `useState` のみ）。
- 店舗・施設データは TypeScript の定数ファイル（`lib/shops.ts` / `lib/clinics.ts`）で管理。
- 整体院・訪問看護の口コミ生成にのみ `@anthropic-ai/sdk` を使用（サーバー側のAPIルート経由。APIキーは `.env.local` の `ANTHROPIC_API_KEY`）。

## ディレクトリ構成

```
review-tool/
├── app/
│   ├── layout.tsx                     # ルートレイアウト（lang=ja・メタ情報）
│   ├── globals.css                    # グローバルCSS（Tailwindインポート）
│   ├── page.tsx                       # トップページ＝簡易パスワード保護つき店舗管理ページ（クライアントコンポーネント）
│   ├── shop/
│   │   └── [shopId]/
│   │       └── page.tsx               # 整体院・訪問看護の口コミ作成ページ（getShopByIdで該当データ取得）
│   ├── clinic/
│   │   └── [clinicId]/
│   │       └── page.tsx               # クリニックの口コミ作成ページ（getClinicByIdで該当データ取得）
│   └── api/
│       └── generate-review/
│           └── route.ts               # 整体院・訪問看護の口コミ文を生成するAPI（Anthropic Claude Haiku）
│
├── components/
│   ├── ShopReviewForm.tsx             # 整体院・訪問看護用フォーム（チェック選択→API呼び出し）
│   ├── CategorySection.tsx            # 整体院・訪問看護のカテゴリ別チェックボックス
│   ├── ClinicSurveyForm.tsx           # クリニック用フォーム（満足度選択→ローカル生成）
│   ├── RatingQuestion.tsx             # クリニックの満足度（5段階）設問
│   ├── FreeTextSection.tsx            # クリニックの自由記述欄
│   └── ReviewResult.tsx               # 生成結果の表示・コピー・投稿遷移（共通）
│
├── lib/
│   ├── types.ts                       # 整体院・訪問看護の型定義（ShopData / ShopBusinessType ほか）
│   ├── shops.ts                       # 整体院・訪問看護のデータ＋getShopById
│   ├── clinic-types.ts                # クリニックの型定義（ClinicSurveyData ほか）
│   ├── clinics.ts                     # クリニックのデータ＋getClinicById
│   ├── review-generator.ts           # 整体院・訪問看護向け口コミ生成補助ロジック
│   ├── clinic-review-generator.ts     # クリニック向け口コミ生成ロジック（ローカル）
│   └── utils.ts                       # 汎用ユーティリティ（cn / countCharacters）
│
├── public/
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
├── package.json
├── README.md
├── CLAUDE.md                          # 本ファイル
└── TASKS.md                           # 残タスク・将来対応
```

## データ構成と店舗一覧

### 業種の区別方法

- `lib/shops.ts` には **整体院と訪問看護が混在**しており、各店舗の `businessType` フィールド（型は `ShopBusinessType = "seitai" | "houkan"`、`lib/types.ts` で定義）で業種を区別する。
- `lib/clinics.ts` には **クリニック**が入っており、データソースそのものが「クリニック」業種を表す（`businessType` フィールドは持たない）。
- トップの管理ページ（`app/page.tsx`）は、この `businessType` とデータソースをもとに「整体院」「訪問看護」「クリニック」の3グループへ自動で振り分ける。

### 視点（audience）フィールド

- `ShopData` には任意の `audience?` フィールドがある（型は `ShopAudience = "referral-partner"`、`lib/types.ts` で定義）。
- 未指定（`undefined`）は **患者・利用者本人/家族の目線**。`"referral-partner"` は **連携先の医療機関スタッフ（ケアマネ・退院支援担当など）の目線**を表す。
- このフィールドは2か所で使われる：
  - **AI生成の視点分岐**：`app/api/generate-review/route.ts` の system プロンプト切り替え（後述）。
  - **ヘッダーのバッジ表示**：`components/ShopReviewForm.tsx` で `audience === "referral-partner"` のとき、店舗名の横に「連携機関用」バッジを表示する。

### AI生成プロンプトの業種・視点別分岐

- `app/api/generate-review/route.ts` の `buildSystemPrompt(shop)` が、`businessType` と `audience` に応じて system プロンプトを **3パターン**で切り替える（以前は「整体院」固定だった）。
  - **整体院**（`businessType: "seitai"`、未知の業種のデフォルトも含む）：来院・施術の体験を患者目線で書く。
  - **訪問看護 利用者向け**（`businessType: "houkan"` かつ `audience` 未指定）：利用者本人・家族の目線。「訪問」「看護」「ケア」などの語彙で在宅療養の体験として書く。
  - **訪問看護 連携用**（`businessType: "houkan"` かつ `audience: "referral-partner"`）：連携パートナーの医療機関スタッフの目線。報告・連絡・相談、多職種連携、専門職としての対応力を評価する視点で書く。
- 選択もフリーテキストもない場合のフォールバック指示文（`buildFallbackUserContent`）も同じ3パターンに合わせて切り替わる。
- 共通の生成ルール（文体・文字数・誇大表現の禁止など）は `SHARED_RULES` 定数にまとめ、全パターンで共有する。
- クリニックはローカル生成（`lib/clinic-review-generator.ts`）のため、このAPIルート・プロンプト分岐は通らない。

### 登録済み店舗・施設一覧

| id | name | 業種 | reviewUrl | アクセスURL |
|----|------|------|-----------|-------------|
| `roots-azabu-honten` | R∞tsメディカル整体院 麻布本店 | 整体院 (`seitai`) | https://g.page/r/CXLOP3Yg9ynSEBM/review | `/shop/roots-azabu-honten` |
| `roots-azabujuban` | R∞tsメディカル整体院 麻布十番店 | 整体院 (`seitai`) | https://g.page/r/CfzmElDVe9BSEBM/review | `/shop/roots-azabujuban` |
| `roots-shimbashi` | R∞tsメディカル整体院 新橋店 | 整体院 (`seitai`) | https://g.page/r/CSiNvE3Gt2LzEBM/review | `/shop/roots-shimbashi` |
| `roots-musashikosugi` | R∞tsメディカル整体院 武蔵小杉店 | 整体院 (`seitai`) | https://g.page/r/CRdSv05vHUaNEBM/review | `/shop/roots-musashikosugi` |
| `sakulabo-houkan` | サクラボ訪問看護ステーション | 訪問看護 (`houkan`) 利用者向け | https://g.page/r/CWwREoDiWlJOEAE/review | `/shop/sakulabo-houkan` |
| `sakulabo-houkan-renkei` | サクラボ訪問看護ステーション（医療機関連携用） | 訪問看護 (`houkan`) 連携用 (`audience: "referral-partner"`) | https://g.page/r/CWwREoDiWlJOEAE/review | `/shop/sakulabo-houkan-renkei` |
| `higashikoganei-kodomo` | 東小金井駅前こどもクリニック | クリニック | https://g.page/r/CRsZzGJeziYFEBE/review | `/clinic/higashikoganei-kodomo` |

整体院4店舗・訪問看護 利用者向け1・訪問看護 連携用1・クリニック1施設（合計7件）。

- `sakulabo-houkan` と `sakulabo-houkan-renkei` は同じサクラボ訪問看護ステーション（`reviewUrl` も共通）だが、**別々のページ**として用意している。
  - `sakulabo-houkan`：患者・利用者本人やその家族向け。カテゴリは利用者視点の8つ。
  - `sakulabo-houkan-renkei`：連携先の医療機関（ケアマネジャー・退院支援担当・訪問診療スタッフ・他の訪問看護ステーションなど）向け。`audience: "referral-partner"` を持ち、カテゴリは連携先視点の6つ（報告・連絡・相談／多職種連携の姿勢／専門性・対応力／連携先としての信頼感／利用者・家族への関わり／対応の速さ・柔軟性）。

### 店舗ページのルートの仕組み

- `/shop/[shopId]`（`app/shop/[shopId]/page.tsx`）：URLの `shopId` を `getShopById(shopId)` に渡して該当データを取得し、`ShopReviewForm` をレンダリングする。該当なしの場合は「店舗が見つかりません。」を表示。
- `/clinic/[clinicId]`（`app/clinic/[clinicId]/page.tsx`）：URLの `clinicId` を `getClinicById(clinicId)` に渡して該当データを取得し、`ClinicSurveyForm` をレンダリングする。該当なしの場合は「クリニックが見つかりません。」を表示。

## トップページ（管理ページ）

`app/page.tsx` は運用者専用の **簡易パスワード保護つき店舗管理ページ**（クライアントコンポーネント）。

- 開くとパスワード入力欄を表示し、正しいパスワードを入力すると店舗一覧を表示する（パスワード文字列は `app/page.tsx` 内に定義。セキュリティのため本ドキュメントには記載しない）。
- 認証状態は `localStorage` に保存し、同じブラウザでは再入力不要。「ログアウト」ボタンでフラグを消すと再度パスワードを要求する。
- `lib/shops.ts` と `lib/clinics.ts` の両方を読み込み、業種別（整体院／訪問看護／クリニック）にグループ分けして件数つきで一覧表示する。
- 各店舗には、口コミ作成ページへのリンク（新規タブ）と `reviewUrl` をクリップボードへコピーするボタンを表示する。
- これは **フロント側のみの簡易チェック**であり、強固な保護ではない。将来的にはサーバー側認証への移行が想定されている（`TASKS.md` 参照）。

## ID命名規則

- 店舗・施設の `id` は英数字とハイフン（kebab-case）。
- 整体院は `roots-{支店名}` の形式（例：`roots-azabu-honten`、`roots-azabujuban`）。
- **`id` を変更するとアクセスURL（`/shop/:id`・`/clinic/:id`）が変わる。** QRコードを配布済みの店舗は既存QRが無効になるため、運用中の `id` は安易に変更しないこと。

## 開発ルール

- 実装は Claude Code 経由で行う。
- **コミット時に `Co-Authored-By` は付けない。**
- 変更後は必ず `npx tsc --noEmit` で型チェックを通すこと。
- 店舗・施設の追加は `lib/shops.ts`（整体院・訪問看護）または `lib/clinics.ts`（クリニック）に追記するだけでよい。管理ページ（`app/page.tsx`）には自動で反映される。
  - 整体院・訪問看護を追加する場合は `businessType` を必ず設定する。整体院は `brand`・`settings`・`categories` を既存整体院と共通の定数（`lib/shops.ts` 内の `seitaiBrand` / `seitaiSettings` / `seitaiCategories`）から流用できる。

## デプロイ

- GitHub リポジトリ **`keitasato-bit/review-tool`** に push すると Vercel が自動デプロイする。
- 本番URL：https://review-tool-ten.vercel.app

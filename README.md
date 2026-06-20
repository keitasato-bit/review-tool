# 口コミ作成補助ツール

整体院・訪問看護・クリニック向けに、来院・利用後のお客様や患者さんがGoogle口コミを書きやすくするためのWebツールです。
項目を選ぶと自然な口コミ文の下書きが生成され、ワンタップでコピー・Google投稿画面へ遷移できます。

> プロジェクトの詳細な全体像・データ構成・運用ルールは [CLAUDE.md](./CLAUDE.md)、残タスクは [TASKS.md](./TASKS.md) を参照してください。

---

## セットアップ手順

### 前提
- Node.js 18 以上

### 手順

```bash
# 1. 依存パッケージをインストール
npm install

# 2. 開発サーバーを起動
npm run dev
```

ブラウザで http://localhost:3000 を開いてください。

整体院・訪問看護の口コミ生成は Anthropic API を利用します。ローカルで動かす場合は `.env.local` に `ANTHROPIC_API_KEY` を設定してください（クリニックの口コミ生成はローカルロジックのみでAPI不要）。

---

## 起動方法

```bash
npm run dev        # 開発サーバー起動
npm run build      # プロダクションビルド
npm run start      # プロダクションサーバー起動
```

---

## ディレクトリ構成

```
review-tool/
├── app/
│   ├── layout.tsx                     # ルートレイアウト
│   ├── globals.css                    # グローバルCSS（Tailwindインポート）
│   ├── page.tsx                       # トップページ（簡易パスワード保護つき店舗管理ページ）
│   ├── shop/
│   │   └── [shopId]/
│   │       └── page.tsx               # 整体院・訪問看護の口コミ作成ページ
│   ├── clinic/
│   │   └── [clinicId]/
│   │       └── page.tsx               # クリニックの口コミ作成ページ
│   └── api/
│       └── generate-review/
│           └── route.ts               # 整体院・訪問看護の口コミ文生成API（Anthropic Claude）
│
├── components/
│   ├── ShopReviewForm.tsx             # 整体院・訪問看護用フォーム
│   ├── CategorySection.tsx            # カテゴリ別チェックボックス
│   ├── ClinicSurveyForm.tsx           # クリニック用フォーム
│   ├── RatingQuestion.tsx             # クリニックの満足度設問
│   ├── FreeTextSection.tsx            # クリニックの自由記述欄
│   └── ReviewResult.tsx               # 生成結果表示・コピー・遷移
│
├── lib/
│   ├── types.ts                       # 整体院・訪問看護の型定義
│   ├── shops.ts                       # 整体院・訪問看護のデータ・取得関数
│   ├── clinic-types.ts                # クリニックの型定義
│   ├── clinics.ts                     # クリニックのデータ・取得関数
│   ├── review-generator.ts           # 整体院・訪問看護向け口コミ生成補助ロジック
│   ├── clinic-review-generator.ts     # クリニック向け口コミ生成ロジック
│   └── utils.ts                       # ユーティリティ関数
│
├── public/
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
├── package.json
└── README.md
```

---

## トップページ（管理ページ）

トップページ（`/`）は運用者専用の **簡易パスワード保護つき店舗管理ページ**です。
パスワードを入力すると、登録されている全店舗・施設を業種別（整体院／訪問看護／クリニック）に一覧表示し、各店舗の口コミ作成ページへのリンクとGoogle口コミURLのコピー機能を利用できます（認証状態はブラウザに保持されます）。

---

## アクセスURL

| パス | 内容 |
|------|------|
| `/` | 店舗管理ページ（簡易パスワード保護） |
| `/shop/roots-azabu-honten` | R∞tsメディカル整体院 麻布本店 |
| `/shop/roots-azabujuban` | R∞tsメディカル整体院 麻布十番店 |
| `/shop/roots-shimbashi` | R∞tsメディカル整体院 新橋店 |
| `/shop/roots-musashikosugi` | R∞tsメディカル整体院 武蔵小杉店 |
| `/shop/sakulabo-houkan` | サクラボ訪問看護ステーション |
| `/clinic/higashikoganei-kodomo` | 東小金井駅前こどもクリニック |

---

## 店舗・施設の追加方法

- **整体院・訪問看護**：`lib/shops.ts` の `shops` 配列に店舗データを追加する。`businessType`（`"seitai"` または `"houkan"`）を必ず設定する。整体院は `brand`・`settings`・`categories` を共通定数（`seitaiBrand` / `seitaiSettings` / `seitaiCategories`）から流用できる。
- **クリニック**：`lib/clinics.ts` の `clinics` 配列に施設データを追加する。

追加したデータは管理ページ（`/`）に自動で反映されます。各店舗・施設は以下を持ちます：

- `id`：URLの `shopId` / `clinicId` に対応
- `name`：店舗・施設名
- `reviewUrl`：Google口コミ投稿先URL
- `brand`：ブランドカラー・ロゴテキスト
- （整体院・訪問看護）`businessType` / `settings` / `categories`
- （クリニック）`ratingQuestions` / `freeTextLabel` / `freeTextPlaceholder`

---

## デプロイ

GitHub リポジトリ `keitasato-bit/review-tool` に push すると Vercel が自動デプロイします。
本番URL：https://review-tool-ten.vercel.app

---

## 今後の拡張案

- **QRコード生成**：店舗ページのURLからQRコードを自動生成し、印刷用PDFとして出力できるようにする
- **管理ページの本格認証**：現在はフロント側の簡易パスワードのみ。サーバー側認証（middleware／環境変数）へ移行する
- **DBとの連携**：店舗データをデータベースで管理し、動的な追加・編集に対応する
- **分析機能**：どのカテゴリ・設問がよく選ばれているかを集計・可視化する

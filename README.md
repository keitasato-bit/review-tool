# 口コミ作成補助ツール

整体院向けに、来院後のお客様がGoogle口コミを書きやすくするためのWebツールです。
チェック形式で感想を選ぶと自然な口コミ文の下書きが生成され、ワンタップでコピー・投稿画面へ遷移できます。

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
│   ├── layout.tsx             # ルートレイアウト
│   ├── globals.css            # グローバルCSS（Tailwindインポート）
│   ├── page.tsx               # トップページ（案内）
│   └── shop/
│       └── [shopId]/
│           └── page.tsx       # 店舗別口コミ作成ページ
│
├── components/
│   ├── ShopReviewForm.tsx     # メインフォーム（クライアントコンポーネント）
│   ├── CategorySection.tsx    # カテゴリ別チェックボックス
│   └── ReviewResult.tsx      # 生成結果表示・コピー・遷移
│
├── lib/
│   ├── types.ts               # 型定義
│   ├── shops.ts               # 店舗データ・取得関数
│   ├── review-generator.ts    # 口コミ文生成ロジック
│   └── utils.ts               # ユーティリティ関数
│
├── public/
│   └── README-placeholder.txt
│
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
├── package.json
└── README.md
```

---

## アクセスURL

| パス | 内容 |
|------|------|
| `/` | 案内ページ |
| `/shop/roots-medical-seitaiin` | R∞tsメディカル整体院の口コミ作成ページ |

---

## 複数店舗対応の考え方

`lib/shops.ts` の `shops` 配列に店舗データを追加するだけで対応できます。

```ts
// lib/shops.ts
const shops: ShopData[] = [
  rootsMedicalSeitaiin,
  anotherShop, // ← 追加するだけ
];
```

各店舗は以下を独自に持ちます：

- `id`：URLの `shopId` に対応
- `brand`：ブランドカラー・ロゴテキスト
- `settings`：口コミ生成の設定（文字数・フリーテキスト許可など）
- `categories`：選択肢一覧（店舗ごとに変更可能）
- `reviewUrl`：Google口コミ投稿先URL

---

## 今後の拡張案

- **QRコード生成**：店舗ページのURLからQRコードを自動生成し、印刷用PDFとして出力できるようにする
- **複数店舗管理画面**：管理者が店舗情報やカテゴリをUI上で編集できるようにする
- **DBとの連携**：店舗データをデータベースで管理し、動的な追加・編集に対応する
- **口コミ文バリエーション**：生成するたびに異なる表現を返すロジックを追加する
- **多言語対応**：英語・中国語など多言語での口コミ文生成に対応する
- **分析機能**：どのカテゴリがよく選ばれているかを集計・可視化する

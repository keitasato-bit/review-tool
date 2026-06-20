# TASKS.md

残タスク・将来対応の管理ドキュメント。

## 未完了

### R∞tsメディカル整体院 渋谷店の追加

- オーナー確認待ちで、Google口コミURL（`https://g.page/r/～/review`）が未取得のため**保留中**。
- URLが取得でき次第、`lib/shops.ts` に5店舗目の整体院として追記する。
  - id案：`roots-shibuya`
  - `businessType: "seitai"`
  - `brand` / `settings` / `categories` は既存整体院と共通（`seitaiBrand` / `seitaiSettings` / `seitaiCategories`）を流用
  - `name` / `logoText`：「R∞tsメディカル整体院 渋谷店」
- 追記後は `npx tsc --noEmit` で型チェックし、管理ページ（`app/page.tsx`）に自動反映されることを確認する。

## 将来対応

### 管理ページの本格認証への移行

- 現在の `app/page.tsx` は**フロント側の簡易パスワードチェックのみ**（パスワード文字列とデータがバンドルに含まれる）。
- 強固な保護が必要になったら、サーバー側認証へ移行する。
  - 案：Next.js middleware または Route Handler ＋ 環境変数によるパスワード/トークン検証。

## 完了済み（履歴）

- 整体院を4店舗構成に拡張（麻布本店・麻布十番店・新橋店・武蔵小杉店）。共通の `seitaiBrand` / `seitaiSettings` / `seitaiCategories` 定数を導入。
- 業種別の店舗管理ページを作成（`app/page.tsx` を簡易パスワード保護つきの管理ページに刷新）。`ShopData` に `businessType` フィールドを追加し、整体院／訪問看護／クリニックの3グループへ自動振り分け。
- クリニック（東小金井駅前こどもクリニック）を追加。`reviewUrl` を専用の口コミ投稿リンクに更新。

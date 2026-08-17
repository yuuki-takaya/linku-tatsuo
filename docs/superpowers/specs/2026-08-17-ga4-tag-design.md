# 設計書：GA4（gtag.js）によるアクセス解析の導入

- **日付:** 2026-08-17
- **対象:** LINK U デモサイト（Next.js 16 App Router / React 19 / Tailwind v4、`linku-story.com`）
- **目的:** サイト全ページのアクセスを GA4 で計測できるようにする
- **関連:** [2026-06-18 企業向けセクション設計書](2026-06-18-company-section-design.md) で「将来の拡張候補」としていた `アクセス解析・コンバージョン計測` の実施

---

## 1. 背景と課題

現状このサイトにはアクセス解析が一切入っていない（`gtag` / `googletagmanager` への参照はコードベースに存在しない）。10月の本ローンチに向けた公開デモサイトとして運用中だが、以下が計測できていない。

- どのページがどれだけ見られているか（トップ／`/business`／各記事）
- チラシのQRから来た企業担当者が `/business` に到達しているか
- 流入経路（QR経由の直接流入か、検索か、SNSか）

GA4 プロパティは作成済みで、測定IDは **`G-M4W6JX6LX5`** が発行されている。このタグをサイトに組み込む。

## 2. ゴール（成功基準）

1. 本番環境の全ページで GA4 の `page_view` が計測される（トップ、`/business`、`/articles/[slug]`）。
2. App Router のクライアントサイド遷移でもページ遷移が計測される。
3. ローカル開発（`npm run dev`）のアクセスは GA4 に送信されない。
4. 初期描画のパフォーマンスを損なわない（タグ読み込みがレンダリングをブロックしない）。

## 3. スコープ外（YAGNI）

- カスタムイベント計測（問い合わせボタンのクリック、フォーム送信のコンバージョン等）
- Google Tag Manager（GTM）の導入
- Cookie 同意バナー（後述「6. 留意事項」参照）
- 手動の `page_view` 送信ロジック（拡張計測機能で足りるため。詳細は 5.2）
- GA4 管理画面側の設定（データストリーム、コンバージョン定義など）

## 4. 確定済みの方針（ブレストでの合意事項）

| 項目 | 決定 | 理由 |
|---|---|---|
| 測定IDの管理 | **ソース内の定数**（`src/lib/data/analytics.ts`） | 測定IDはページソースに必ず露出する公開情報でありシークレットではない。既存の `CONTACT_FORM_URL` / `CONTACT_EMAIL` と同じ「公開設定値は `src/lib/data/` の定数」という慣習に揃う。`.env*` は `.gitignore` 済みのため、環境変数だとデプロイ先での設定漏れで無言のまま計測が止まるリスクがある |
| 計測対象環境 | **本番ビルドのみ**（`NODE_ENV === "production"`） | localhost の開発アクセスで GA4 のデータを汚さない。Vercel のプレビューデプロイは production ビルドのため計測対象に含まれる |
| スクリプト読み込み | **`next/script`** の `strategy="afterInteractive"` | Next.js 公式の GA4 導入方法。生の `<script>` を JSX に書くと React が要素として扱い、`async` 属性や2つのスニペットの実行順序が保証されない |

## 5. 実装内容

### 5.1 新規ファイル

**`src/lib/data/analytics.ts`** — 測定IDの定数を定義する。

```ts
// GA4 の測定ID（公開情報。ページソースに露出する）
export const GA_MEASUREMENT_ID = "G-M4W6JX6LX5";
```

**`src/components/analytics/GoogleAnalytics.tsx`** — gtag.js を読み込む Server Component。

- `process.env.NODE_ENV !== "production"` のときは `null` を返す（開発環境を除外）
- `next/script` を2つ使う。いずれも `strategy="afterInteractive"`
  1. 外部スクリプト：`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  2. インラインスクリプト：`dataLayer` の初期化と `gtag('js', new Date())` / `gtag('config', GA_MEASUREMENT_ID)`
- インライン側は `dangerouslySetInnerHTML` で内容を渡す（`next/script` のインラインスクリプトの標準的な書き方）
- 状態も対話も持たないため `"use client"` は不要

### 5.2 既存ファイルの変更

**`src/app/layout.tsx`** — `<body>` 内に `<GoogleAnalytics />` を追加する。ルートレイアウトは全ルートに適用されるため、これ1箇所で全ページがカバーされる。既存の `ContactModalProvider` の内側／外側どちらでも動作するが、UI ツリーと関心が異なるため `ContactModalProvider` の外（兄弟）に置く。

### 5.3 ページ遷移の計測について

App Router のクライアントサイドナビゲーション（`<Link>` による遷移）では、`gtag('config', ...)` を含むインラインスクリプトは再実行されない。ただし GA4 の**拡張計測機能**の「ブラウザの履歴イベントに基づくページの変更」がデフォルトで有効になっており、`history.pushState` を検知して `page_view` を自動送信する。このため `usePathname` を使った手動送信は実装しない。

検証時に遷移が計測されていなければ、GA4 管理画面（データストリーム → 拡張計測機能）で当該設定が ON になっているか確認する。それでも計測されない場合に限り、手動送信の追加を別途検討する。

## 6. 留意事項

**Cookie 同意について。** GA4 は Cookie を使用する。日本の個人情報保護法では現状 Cookie 同意バナーは必須ではないが、EU からのアクセスがある場合は GDPR の対象となりうる。本サイトは国内の学生・企業向けであり、また `DemoNotice` の通りローンチ後は会員制へ移行する予定のため、今回はバナーを実装しない。将来的にプライバシーポリシーページを設ける際に、GA4 の利用を明記することを推奨する。

## 7. 検証手順

1. `npm install`（このワークツリーには `node_modules` が無いため必要）
2. `npm run build` — 型エラー・ビルドエラーが出ないこと
3. `npm run lint` — エラーが出ないこと
4. `npm run start` でプロダクションサーバーを起動し、ブラウザの Network タブで `googletagmanager.com/gtag/js?id=G-M4W6JX6LX5` へのリクエストが発生することを確認
5. 同じくプロダクションサーバーで、`/` → `/business` のクライアントサイド遷移時に `google-analytics.com/g/collect` へのリクエストが発生することを確認
6. `npm run dev` を起動し、`googletagmanager.com` へのリクエストが**発生しない**ことを確認

## 8. 変更ファイル一覧

| ファイル | 種別 |
|---|---|
| `src/lib/data/analytics.ts` | 新規 |
| `src/components/analytics/GoogleAnalytics.tsx` | 新規 |
| `src/app/layout.tsx` | 変更（import 1行＋コンポーネント 1行） |

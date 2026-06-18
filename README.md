This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## お問い合わせフォーム（Tally）の設定

`/business` ページの問い合わせフォームは Tally の埋め込みを使用します。

1. [Tally](https://tally.so) でフォームを作成（例：会社名／ご担当者名／メール／電話／希望プラン／相談内容）
2. フォームの通知先メールを `company@be-u.co.jp` に設定
3. フォームID（`https://tally.so/r/XXXXXX` の `XXXXXX`）を環境変数に設定：

   ```bash
   # .env.local
   NEXT_PUBLIC_TALLY_FORM_ID=XXXXXX
   ```

   本番（Vercel 等）では同名の環境変数を設定する。

未設定の場合、フォーム枠の代わりに `company@be-u.co.jp` へのメールリンクが表示される（ページは壊れない）。

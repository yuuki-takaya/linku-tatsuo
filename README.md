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

## お問い合わせフォーム（Google フォーム）

サイト各所の「お問い合わせ」ボタンをクリックすると、モーダルで Google フォームが開きます。

- フォームのURLは `src/lib/data/business.ts` の `CONTACT_FORM_URL` で管理しています（差し替え可能。Google フォームの「送信」→「&lt;&gt;（埋め込み）」で得られる `https://docs.google.com/forms/d/e/.../viewform?embedded=true` を設定）。
- 回答は、その Google フォームに紐づく送信先（フォームの回答／連携スプレッドシート）に届きます。
- フォールバックとして、モーダル内および問い合わせセクションに `company@be-u.co.jp`（`CONTACT_EMAIL`）へのメールリンクを表示します。

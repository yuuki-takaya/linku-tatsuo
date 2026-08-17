import Script from "next/script";

import { GA_MEASUREMENT_ID } from "@/lib/data/analytics";

/**
 * GA4（gtag.js）を読み込むコンポーネント。
 *
 * 本番ビルドのときだけスクリプトを出力する。ローカル開発（npm run dev）の
 * アクセスが GA4 の計測データを汚さないようにするため。
 * Vercel のプレビューデプロイは production ビルドなので計測対象に含まれる。
 *
 * 状態も対話も持たない Server Component のため "use client" は不要。
 */
export default function GoogleAnalytics() {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_MEASUREMENT_ID}');
          `,
        }}
      />
    </>
  );
}

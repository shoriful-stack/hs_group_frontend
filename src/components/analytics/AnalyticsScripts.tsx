"use client";

import Script from "next/script";

/**
 * Google Tag Manager + Stape.io (server-side GTM) loader.
 *
 * Env (.env.local):
 * - NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
 * - NEXT_PUBLIC_GTM_SERVER_URL=https://sgtm.yourdomain.com  (Stape custom domain)
 */
export default function AnalyticsScripts() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim();
  const serverUrl = process.env.NEXT_PUBLIC_GTM_SERVER_URL?.trim().replace(/\/$/, "");

  if (!gtmId) return null;

  const gtmHost = serverUrl || "https://www.googletagmanager.com";

  const snippet = `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'${gtmHost}/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');
window.__GTM_SERVER_URL__=${JSON.stringify(serverUrl || "")};
`.trim();

  const noscriptSrc = `${gtmHost}/ns.html?id=${gtmId}`;

  return (
    <>
      <Script id="gtm-init" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: snippet }} />
      <noscript>
        <iframe
          src={noscriptSrc}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  );
}

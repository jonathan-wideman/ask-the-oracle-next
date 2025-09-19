// pages/_document.js

import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head />
      <body className="bg-zinc-900 text-zinc-200 font-body">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

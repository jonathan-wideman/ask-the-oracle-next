// pages/_document.js

import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head />
      <body className="bg-zinc-900 text-zinc-200 font-body bg-[url('/knotwork-tiling-dkmode-00.png')] bg-center bg-size-[160px] bg-repeat bg-blend-multiply">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

import { ReactNode } from "react";
import CustomHead from "./CustomHead";
import Footer from "./Footer";
import Header from "./Header";

// TODO: refactor to "Custom App" component, see: https://nextjs.org/docs/basic-features/layouts

export default function Layout({ children, pageTitle }: { children: ReactNode; pageTitle?: string }) {
  return (
    <>
      <CustomHead pageTitle={pageTitle} />
      <Header />
      <main className="pt-12">{children}</main>
      <Footer />
    </>
  );
}

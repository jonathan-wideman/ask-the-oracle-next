import Link from "next/link";
import Layout from "../components/Layout";
import { classNames, styleAnimationDelay } from "../lib/util";
import { Container } from "../components/atoms/Container";

export default function Home() {
  return (
    <Layout>
      <main>
        <Container variant="center">
          <p className={classNames("mb-4 text-3xl font-bold", "fadein")}>
            Greetings, Ironsworn!
          </p>
          <p
            className={classNames("mb-4 text-lg font-bold", "fadein")}
            style={styleAnimationDelay(0.5)}
          >
            I am the Oracle.
          </p>
          <p className="fadein" style={styleAnimationDelay(1)}>
            You may{" "}
            <Link href={"/oracles/categories"}>ask after your fate</Link>
          </p>
          <p className="fadein" style={styleAnimationDelay(1)}>
            or <Link href={"/moves/categories"}>consider your actions</Link>.
          </p>
        </Container>
      </main>
    </Layout>
  );
}

import Layout from "../components/Layout";
import { classNames, styleAnimationDelay } from "../lib/util";
import { Container } from "../components/atoms/Container";
import { LinkVariant } from "../components/atoms/LinkVariant";

export default function Home() {
  return (
    <Layout>
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
          <LinkVariant href={"/oracles/categories"}>
            ask after your fate
          </LinkVariant>
        </p>
        <p className="fadein" style={styleAnimationDelay(1)}>
          or{" "}
          <LinkVariant href={"/moves/categories"}>
            consider your actions
          </LinkVariant>
          .
        </p>
      </Container>
    </Layout>
  );
}

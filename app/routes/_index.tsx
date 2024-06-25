import type { MetaFunction } from "@remix-run/node";
import { Link, redirect } from "@remix-run/react";

export const clientLoader  = () => {
  return redirect("/games");
}

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix SPA" },
    { name: "description", content: "Welcome to Remix (SPA Mode)!" },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Megic Playground</h1>
      <ul>
        <li>
          <Link to={"/base"}>base</Link>
        </li>
        <li>
          <Link to={"/kaiji"}>kaiji</Link>
        </li>
        <li>
          <Link to={"/basket"}>basket</Link>
        </li>
        <li>
          <Link to={"/player"}>player</Link>
        </li>
        <li>
          <Link to={"/complex-player"}>complex-player</Link>
        </li>
        <li>
          <Link to={"/pachinko"}>pachinko</Link>
        </li>
        <li>
          <Link to={"/dice"}>dice-manipulated</Link>
        </li>
        <li>
          <Link to={"/dice-simple"}>dice-simple</Link>
        </li>
        <li>
          <Link to={"/uikit-test"}>uikit-test</Link>
        </li>
        <li>
          <Link to={"/mui"}>mui</Link>
        </li>
      </ul>
    </div>
  );
}

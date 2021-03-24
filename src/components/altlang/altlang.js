import React from "react";
import { Aux } from "../../index";

import altlangs from "./altlang.json";

const _rootPath = process.env.ROOT_PATH || "/";

const _renderAltLangs = () => {
  let langs = [];
  altlangs.forEach((alt) => {
    langs.push(
      <link
        rel="alternate"
        hrefLang={`${alt.lc}-${alt.cc}`}
        href={`${_rootPath}?cc=${alt.cc}&lc=${alt.lc}`}
        key={`${alt.lc}-${alt.cc}`}
      />
    );
  });
  return langs;
};

const AltLangs = () => {
  return (
    <Aux>
      <link rel="alternate" hrefLang="x-default" href={_rootPath} />
      {_renderAltLangs()}
    </Aux>
  );
};

export default AltLangs;

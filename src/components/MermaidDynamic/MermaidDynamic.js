import dynamic from "next/dynamic";

import { InlineLoading } from "components";

const Mermaid = dynamic(() => import("./Mermaid"), {
  loading: () => <InlineLoading />,
  ssr: false,
});

const MermaidDynamic = (props) => {
  return <Mermaid {...props} />;
};

export default MermaidDynamic;

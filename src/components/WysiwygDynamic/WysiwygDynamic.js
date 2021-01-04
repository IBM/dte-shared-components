import dynamic from "next/dynamic";

import { InlineLoading } from "components";

const Wysiwyg = dynamic(() => import("./Wysiwyg"), {
  loading: () => <InlineLoading />,
  ssr: false,
});

const WysiwygDynamic = (props) => {
  return <Wysiwyg {...props} />;
};

export default WysiwygDynamic;

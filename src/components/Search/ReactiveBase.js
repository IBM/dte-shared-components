import { ReactiveBase as ReactiveSearchReactiveBase } from "@appbaseio/reactivesearch";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

import { getSearchBase } from "../../lib/crud";

const ReactiveSearch = (props) => {
  return <ReactiveSearchReactiveBase {...props} />;
};

ReactiveSearch.defaultProps = {
  url: `${getSearchBase()}`,
  theme: {
    typography: {
      fontFamily: "ibm-plex-sans,Helvetica Neue,Arial,sans-serif",
      fontSize: "16px",
    },
    colors: {
      textColor: "#323232",
      backgroundColor: "#ffffff",
      titleColor: "#000",
      alertColor: "#da1e27",
      borderColor: "#e0e0e0",
    },
  },
};

export default ReactiveSearch;

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const withHistory = (Component) => (props = {}) => {
  // eslint-disable-next-line react/prop-types
  const { initial = [] } = props;
  const { asPath = "/" } = useRouter();

  const [history, setHistory] = useState(initial);

  const previousPage = () => {
    return (history && history.slice(-1).pop()) || undefined;
  };

  useEffect(() => {
    const previous = previousPage();
    if (!history || history.length === 0 || previous !== asPath) setHistory([...history, asPath]);
  }, [asPath]);

  return <Component {...props} history={history} />;
};

export default withHistory;

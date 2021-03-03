import NoResults from "./NoResults";

export default {
  title: "DTE/NoResults",
  component: NoResults,
};

export const Primary = () => <NoResults error="error message" mode="grid" />;

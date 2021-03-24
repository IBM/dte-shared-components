import Strip from "./Strip";

export default {
  title: "DTE/Strip",
  component: Strip,
};

export const Primary = () => <Strip>text content</Strip>;

//Strip- it removes HTML from the string
export const DemoCase = () => (
  <Strip>
    Some HTML here strip : <p>Strip component in action</p>
    <button>DemoButton</button>
  </Strip>
);

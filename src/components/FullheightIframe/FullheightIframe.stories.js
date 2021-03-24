import FullheightIframe from "./FullheightIframe";

export default {
  title: "DTE/FullheightIframe",
  component: FullheightIframe,
};

let srcValue =
  "https://bigblue.aha.io/shared/dbb1f2d9572027aad4d676537be93187/snapshot";

export const DemoCase = (args) => (
  <div className="iframe-content">
    <FullheightIframe src={srcValue} id="2" />
  </div>
);

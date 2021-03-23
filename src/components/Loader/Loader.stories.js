import Loader from "./Loader";

export default {
  title: "DTE/Loader",
  component: Loader,
};

export const Template = (Component, args) => (
  <Loader initial={false}>
    <Component user="ibmer" />
  </Loader>
);
// export const Default = Template.bind({});
// Default.args = {};

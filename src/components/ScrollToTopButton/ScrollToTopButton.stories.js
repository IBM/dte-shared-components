import ScrollToTopButton from "./ScrollToTopButton";

export default {
  title: "DTE/ScrollToTopButton",
  component: ScrollToTopButton,
};

const Template = (args) => <ScrollToTopButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  labelText: "up to top",
  force: true,
};

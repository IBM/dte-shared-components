import Markdown from "./Markdown";

export default {
  title: "DTE/Markdown",
  component: Markdown,
};

const Template = (args) => <Markdown {...args} />;

export const Default = Template.bind({});
Default.args = {
  source: "demo markdown text",
};

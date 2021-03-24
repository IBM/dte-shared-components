import InlineLoading from "./InlineLoading";

export default {
  title: "DTE/InlineLoading",
  component: InlineLoading,
};

const Template = (args) => <InlineLoading {...args} />;

export const Default = Template.bind({});
Default.args = {
  description: "<InlineLoading message>",
};

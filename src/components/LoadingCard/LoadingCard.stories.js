import LoadingCard from "./LoadingCard";

export default {
  title: "DTE/LoadingCard",
  component: LoadingCard,
};

const Template = (args) => <LoadingCard {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const demoMessage = Template.bind({});
demoMessage.args = {
  message: "<Loading message>",
};

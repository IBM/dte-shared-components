import CreateNewButton from "./CreateNewButton";

export default {
  title: "DTE/CreateNewButton",
  component: CreateNewButton,
};

const Template = (args) => <CreateNewButton {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Primary = Template.bind({});
Primary.args = {
  namespace: "<new page>",
};

import ButtonSet from "./ButtonSet";

export default {
  title: "DTE/ButtonSet",
  component: ButtonSet,
};

const Template = (args) => <ButtonSet {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Default",
};

export const Primary = Template.bind({});
Primary.args = {
  kind: "primary",
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  kind: "tertiary",
};

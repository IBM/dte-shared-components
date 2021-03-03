import IconButton from "./IconButton";

export default {
  title: "DTE/IconButton",
  component: IconButton,
};

const Template = (args) => <IconButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Default",
};

export const Primary = Template.bind({});
Primary.args = {
  kind: "primary",
  children: "Primary IconButton",
};

export const Secondary = Template.bind({});
Secondary.args = {
  kind: "secondary",
  children: "Secondary IconButton",
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  kind: "tertiary",
  children: "Tertiary IconButton",
};

export const Danger = Template.bind({});
Danger.args = {
  kind: "danger",
  children: "Danger IconButton",
};

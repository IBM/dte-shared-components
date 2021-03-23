import IconButton from "./IconButton";
import { Bee32 } from "@carbon/icons-react";

export default {
  title: "DTE/IconButton",
  component: IconButton,
};

//ALL ARE DEMO Cases with Bee32 icon.
const Template = (args) => <IconButton renderIcon={Bee32} {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "<AnyText & ->",
};

export const Primary = Template.bind({});
Primary.args = {
  iconDescription: "primary",
  kind: "primary",
  children: "IBM",
};

export const Secondary = Template.bind({});
Secondary.args = {
  kind: "secondary",
  children: "IBM",
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  kind: "tertiary",
  children: "IBM",
};

export const Danger = Template.bind({});
Danger.args = {
  kind: "danger",
  children: "IBM",
};

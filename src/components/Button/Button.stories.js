import React from "react";
import Button from "./Button";

export default {
  title: "DTE/Button",
  component: Button,
};

const Template = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Default",
};

export const Primary = Template.bind({});
Primary.args = {
  kind: "primary",
  children: "Primary Button",
};

export const Secondary = Template.bind({});
Secondary.args = {
  kind: "secondary",
  children: "Secondary Button",
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  kind: "tertiary",
  children: "Tertiary Button",
};

export const Danger = Template.bind({});
Danger.args = {
  kind: "danger",
  children: "Danger Button",
};

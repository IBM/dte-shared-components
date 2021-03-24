import React from "react";
import TypeaheadInputText from "./TypeaheadInputText";

export default {
  title: "DTE/TypeaheadInputText",
  component: TypeaheadInputText,
};

const Template = (args) => <TypeaheadInputText {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const DemoCase = Template.bind({});
DemoCase.args = {
  labelText: "<labelText>",
  helperText: "<helperText>",
  placeHolder: "Enter here...",
};

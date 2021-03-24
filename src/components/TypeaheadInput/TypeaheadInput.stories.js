import React from "react";
import TypeaheadInput from "./TypeaheadInput";

export default {
  title: "DTE/TypeaheadInput",
  component: TypeaheadInput,
};

const Template = (args) => <TypeaheadInput {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const DemoCase = Template.bind({});
DemoCase.args = {
  labelText: "<labelText>",
  helperText: "<helperText>",
  inputPlaceHolder: "Enter here...",
};

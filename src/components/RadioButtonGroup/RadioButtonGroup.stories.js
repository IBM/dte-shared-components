import RadioButtonGroup from "./RadioButtonGroup";

export default {
  title: "DTE/RadioButtonGroup",
  component: RadioButtonGroup,
};

const Template = (args) => <RadioButtonGroup {...args} />;

export const Default = Template.bind({});
Default.args = {
  values: ["option1", "option2", "option3"],
};

//Right orientation
export const DemoCase = Template.bind({});
DemoCase.args = {
  values: ["v1", "v2", "v3"],
  orientation: "right",
  labelText: "Pick your option",
};

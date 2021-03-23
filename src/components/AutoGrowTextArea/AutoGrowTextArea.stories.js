import AutoGrowTextArea from "./AutoGrowTextArea";

export default {
  title: "DTE/AutoGrowTextArea",
  component: AutoGrowTextArea,
};

const Template = (args) => <AutoGrowTextArea {...args} />;

export const Default = Template.bind({});
Default.args = {};

//Demo case: Input text field with min. 5 rows
export const demoCase = Template.bind({});
demoCase.args = {
  value: "heading",
  minRows: 5,
  placeholder: "Placeholder text",
};

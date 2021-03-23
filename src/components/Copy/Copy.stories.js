import Copy from "./Copy";

export default {
  title: "DTE/Copy",
  component: Copy,
};

const Template = (args) => <Copy {...args} />;

export const Default = Template.bind({});
Default.args = {
  labelText: "Copy text",
  value: "copy text",
};

export const InputCase = Template.bind({});
InputCase.args = {
  labelText: "Copy text",
  value: "copy text",
  type: "input",
};

export const TextareaCase = Template.bind({});
TextareaCase.args = {
  labelText: "Copy text",
  value: "copy text",
  type: "textarea",
};

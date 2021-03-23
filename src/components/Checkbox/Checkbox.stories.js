import Checkbox from "./Checkbox";

export default {
  title: "DTE/Checkbox",
  component: Checkbox,
};

const Template = (args) => <Checkbox {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: "1",
  name: "checkbox",
  checked: true,
  value: "val1",
  helperText: "helper text",
  labelText: "<Checkbox label>",
};

import DateLabel from "./DateLabel";

export default {
  title: "DTE/DateLabel",
  component: DateLabel,
};

const Template = (args) => <DateLabel {...args} />;

export const Default = Template.bind({});
Default.args = {
  labelText: "<labelText>",
  helperText: "<helperText>",
  value: {},
};

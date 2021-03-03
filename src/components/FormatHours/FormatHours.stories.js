import FormatHours from "./FormatHours";

export default {
  title: "DTE/FormatHours",
  component: FormatHours,
};

const Template = (args) => <FormatHours {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: "24",
};

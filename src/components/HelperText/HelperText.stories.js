import HelperText from "./HelperText";

export default {
  title: "DTE/HelperText",
  component: HelperText,
};

const Template = (args) => <HelperText {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const demoCase = Template.bind({});
demoCase.args = {
  source: "HelperText",
  //className="bx--label"
};

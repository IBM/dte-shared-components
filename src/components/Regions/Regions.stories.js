import Regions from "./Regions";

export default {
  title: "DTE/Regions",
  component: Regions,
};

const Template = (args) => <Regions {...args} />;

export const Default = Template.bind({});
Default.args = {};

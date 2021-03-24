import Dropdown from "./Dropdown";

export default {
  title: "DTE/Dropdown",
  component: Dropdown,
};

const Template = (args) => <Dropdown {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "<dropdown label>",
};

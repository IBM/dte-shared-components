import Ribbon from "./Ribbon";

export default {
  title: "DTE/Ribbon",
  component: Ribbon,
};

const Template = (args) => <Ribbon {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Primary = Template.bind({});

//unqiue location : bottom-left
Primary.args = {
  color: "primary",
  label: "Primary color",
  location: "bottom-left",
};

//unqiue location : top-right
export const Secondary = Template.bind({});
Secondary.args = {
  color: "secondary",
  label: "Secondary color",
  location: "top-right",
};

//unqiue location : top-left
export const Danger = Template.bind({});
Danger.args = {
  color: "danger",
  label: "Danger color",
  location: "top-left",
};

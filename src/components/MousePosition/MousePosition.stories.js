import MousePosition from "./MousePosition";

export default {
  title: "DTE/MousePosition",
  component: MousePosition,
};

const Template = (args) => <MousePosition {...args} />;

export const Default = Template.bind({});
Default.args = {};

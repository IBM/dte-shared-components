import Notifications from "./Notifications";

export default {
  title: "DTE/Notifications",
  component: Notifications,
};
const Template = (args) => <Notifications {...args} />;

export const Default = Template.bind({});
Default.args = {
  source: "demo markdown text",
};

export const DemoCase = Template.bind({});
DemoCase.args = {
  notifications: ["Notification here..."],
};

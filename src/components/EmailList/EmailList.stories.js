import EmailList from "./EmailList";

export default {
  title: "DTE/EmailList",
  component: EmailList,
};

const Template = (args) => <EmailList {...args} />;

export const Default = Template.bind({});
Default.args = {
  list: ["dte@ibm.com", "cloud@ibm.com"],
  format: "short",
};

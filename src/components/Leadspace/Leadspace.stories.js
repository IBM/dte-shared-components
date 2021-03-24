import Leadspace from "./Leadspace";

export default {
  title: "DTE/Leadspace",
  component: Leadspace,
};

const Template = (args) => <Leadspace {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "IBM <title>",
  subtitle: "this is the subtitel",
  description: "Welcome -- this is the leadspace description",
};

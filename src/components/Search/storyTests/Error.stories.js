import Error from "../Error";

export default {
  title: "DTE/Error",
  component: Error,
};

const Template = (args) => <Error {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "<Error message>",
};

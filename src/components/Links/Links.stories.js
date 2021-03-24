import Links from "./Links";

export default {
  title: "DTE/Links",
  component: Links,
};

const Template = (args) => <Links {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "<InvaildText>",
};

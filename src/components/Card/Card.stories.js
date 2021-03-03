import Card from "./Card";

export default {
  title: "DTE/Card",
  component: Card,
};

const Template = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
  heading: "heading",
  subheading: "sub heading",
  copy: "hello world",
  date: new Date().toISOString(),
  cta: {
    href: "ibm.com",
  },
  //   data: {},
};

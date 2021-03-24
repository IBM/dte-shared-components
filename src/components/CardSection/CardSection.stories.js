import CardSection from "./CardSection";

export default {
  title: "DTE/CardSection",
  component: CardSection,
};

const Template = (args) => <CardSection {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "<children text>",
  heading: "<Heading> ",
};

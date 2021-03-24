import ContentSection from "./ContentSection";

export default {
  title: "DTE/ContentSection",
  component: ContentSection,
};

const Template = (args) => <ContentSection {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "<children text>",
  heading: "<Heading> ",
};

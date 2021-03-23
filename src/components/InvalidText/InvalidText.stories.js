import InvalidText from "./InvalidText";

export default {
  title: "DTE/InvalidText",
  component: InvalidText,
};

const Template = (args) => <InvalidText {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <p>InvaildText</p>,
  invalid: true,
};

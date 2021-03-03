import ButtonLoading from "./ButtonLoading";

export default {
  title: "DTE/ButtonLoading",
  component: ButtonLoading,
};

const Template = (args) => <ButtonLoading {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Default",
};

export const Primary = Template.bind({});
Primary.args = {
  kind: "primary",
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  kind: "tertiary",
};

import Flag from "./Flag";

export default {
  title: "DTE/Flag",
  component: Flag,
};

const Template = (args) => <Flag {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "Default",
};

export const Featured = Template.bind({});
Featured.args = {
  label: "Featured",
};

export const Governed = Template.bind({});
Governed.args = {
  label: "Governed",
};

export const Covid = Template.bind({});
Covid.args = {
  label: "Covid",
};

import SalesOpportunity from "./SalesOpportunity";

export default {
  title: "DTE/SalesOpportunity",
  component: SalesOpportunity,
};

const Template = (args) => <SalesOpportunity {...args} />;

export const Default = Template.bind({});
Default.args = {
  values: [],
  errors: [],
  touched: [],
};

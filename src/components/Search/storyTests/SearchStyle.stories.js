import SearchStyle from "../SearchStyle";

export default {
  title: "DTE/SearchStyle",
  component: SearchStyle,
};

const Template = (args) => <SearchStyle {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "<text ... >",
};

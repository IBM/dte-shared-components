import Rating from "./Rating";

export default {
  title: "DTE/Rating",
  component: Rating,
};

const Template = (args) => <Rating {...args} />;

export const Default = Template.bind({});
Default.args = {
  initialRating: 3,
  totalRating: 100,
  readonly: true,
  buttonSetStyle: {},
};

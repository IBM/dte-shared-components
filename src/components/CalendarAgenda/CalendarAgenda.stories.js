import CalendarAgenda from "./CalendarAgenda";

export default {
  title: "DTE/CalendarAgenda",
  component: CalendarAgenda,
};

const Template = (args) => <CalendarAgenda {...args} />;

export const Default = Template.bind({});
Default.args = {
  event: {
    description: "<calendardescription>",
    url: "http://www.ibm.com",
  },
  title: "calendar",
};

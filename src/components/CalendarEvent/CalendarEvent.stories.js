import CalendarEvent from "./CalendarEvent";

export default {
  title: "DTE/CalendarEvent",
  component: CalendarEvent,
};

const Template = (args) => <CalendarEvent {...args} />;

export const Default = Template.bind({});
Default.args = {
  event: {
    description: "calendarevent",
    url: "http://www.ibm.com",
  },
  title: "calendar",
};

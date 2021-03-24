import DateTimePicker from "./DateTimePicker";
// import ct from "countries-and-timezones"; // has proper IANA data for dates and times with dst and utc offsets
// import moment from "moment";

export default {
  title: "DTE/DateTimePicker",
  component: DateTimePicker,
};

const Template = (args) => <DateTimePicker {...args} />;

export const Default = Template.bind({});
Default.args = {
  // labelText: "<labelText>",
  // helperText: "<helperText>",
};

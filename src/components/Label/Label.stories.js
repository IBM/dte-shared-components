import Label from "./Label";
import InlineLoading from "../InlineLoading/InlineLoading";

export default {
  title: "DTE/Label",
  component: Label,
};

const Template = (args) => <Label description=" <InlineLoading />"> </Label>;

export const Default = Template.bind({});
Default.args = {
  description: "<InlineLoading message>",
};

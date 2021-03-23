import ButtonSet from "./ButtonSet";
import { Button } from "../../index";

export default {
  title: "DTE/ButtonSet",
  component: ButtonSet,
};

const Template = (args) => (
  <ButtonSet {...args}>
    <Button> ButtonSet</Button>
  </ButtonSet>
);

export const Default = Template.bind({});
Default.args = {};

//aligh two button right
export const DemoCase = (args) => (
  <ButtonSet align="left">
    <Button> ButtonSet2</Button>
    <Button> ButtonSet</Button>
  </ButtonSet>
);

import Mailto from "./Mailto";
import { Button } from "carbon-components-react";

export default {
  title: "DTE/Mailto",
  component: Mailto,
};

const Template = (args) => <Mailto {...args}>{/* <Button />{" "} */}</Mailto>;

export const Default = Template.bind({});
Default.args = {
  children: <Button>click here</Button>,
};

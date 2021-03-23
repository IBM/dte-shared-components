import Form from "./Form";
import { Button, AutoGrowTextArea, Checkbox } from "../../index";
import { InlineLoading } from "carbon-components-react";

export default {
  title: "DTE/Form",
  component: Form,
};

export const DemoCase = (args) => (
  <Form {...args}>
    <AutoGrowTextArea placeholder="Type here..." minRows="3" />
    <Button kind="danger">Form Button</Button>
    <Checkbox name="checkbox" labelText="ibm checklist" />
    <InlineLoading description="loading..." />
  </Form>
);

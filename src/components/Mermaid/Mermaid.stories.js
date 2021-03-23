import Mermaid from "./Mermaid";

export default {
  title: "DTE/Mermaid",
  component: Mermaid,
};

const Template = (args) => <Mermaid {...args} />;

export const Default = Template.bind({});
Default.args = {};

//Follow this link to learn more about it: https://mermaid-js.github.io/mermaid/#/flowchart
export const DemoCase = Template.bind({});
DemoCase.args = {
  id: "diagram",
  labelText: "Diagram",
  placeholder: "Create a mermaidjs diagram",
  value: "graph TD \n Start --> Stop",
};

export const DemoCase2 = Template.bind({});
DemoCase2.args = {
  id: "diagram",
  labelText: "Diagram",
  placeholder: "Create a mermaidjs diagram",
  value: "graph LR \n Start --> Stop",
};

import React from "react";
import Tooltip from "./Tooltip";

export default {
  title: "DTE/Tooltip",
  component: Tooltip,
};

const Template = (args) => <Tooltip {...args} />;

export const Default = Template.bind({});
Default.args = {
  align: "center",
  className: "hello",
  children: "child",
  tooltipText: "Tooltip-props text",
  markdown: false,
};

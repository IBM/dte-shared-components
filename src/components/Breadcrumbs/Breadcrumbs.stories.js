import Breadcrumbs from "./Breadcrumbs";
const ROOT = "https://www.ibm.com/demos/badges?lc=en";
const baseUrl = " https://www.ibm.com/demos";

export default {
  title: "DTE/Breadcrumbs",
  component: Breadcrumbs,
};

const Template = (args) => <Breadcrumbs {...args} />;

export const demoCase = Template.bind({});

//Demo case -- Navigates to IBM Demos website
demoCase.args = {
  noTrailingSlash: true,
  breadcrumbs: [
    {
      href: baseUrl,
      label: "HomePage",
    },
    { href: ROOT, label: "Badges" },
  ],
};

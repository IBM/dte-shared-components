import Navigation from "./Navigation";

export default {
  title: "DTE/Navigation",
  component: Navigation,
};

const Template = (args) => <Navigation {...args} />;

export const Default = Template.bind({});
Default.args = {
  config: {
    logo: { label: "IBM **Asset Repo**", href: "/" },
    links: [
      {
        name: "home",
        href: "/",
        label: "Home",
      },
    ],
  },
};

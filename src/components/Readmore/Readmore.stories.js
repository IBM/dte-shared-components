import Readmore from "./Readmore";

export default {
  title: "DTE/Readmore",
  component: Readmore,
};

const Template = (args) => <Readmore {...args} />;

export const Default = Template.bind({});
Default.args = {
  source: "Readmore source",
  disallowedTypes: ["paragraph"],
  markdown: true,
};

// https://www.lipsum.com/
export const DemoCase = Template.bind({});
DemoCase.args = {
  source:
    "Dummy text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elit diam, egestas non ligula et, condimentum faucibus odio. \n Vestibulum sit amet mollis tortor. Nunc sed ipsum sollicitudin arcu pulvinar ornare in a nulla. Nullam in bibendum leo. Phasellus pellentesque dignissim pellentesque.\n Phasellus pulvinar sapien in nisl efficitur, at viverra diam cursus. Curabitur finibus ac nunc at tincidunt. Ut vel scelerisque libero. Integer quis nulla quis arcu rhoncus facilisis ut eu nisl. Etiam in semper tortor. Pellentesque facilisis sapien ex, sed lacinia libero faucibus id. Sed sit amet rutrum odio, congue commodo tellus. Fusce varius orci vel ornare scelerisque. Vestibulum pulvinar neque at velit accumsan eleifend. Ut condimentum, mi eu pretium malesuada, lorem tortor efficitur elit, at consectetur sapien risus et justo. Duis non luctus mi",
  disallowedTypes: ["paragraph"],
  markdown: true,
};

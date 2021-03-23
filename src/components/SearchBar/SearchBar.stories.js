import SearchBar from "./SearchBar";

export default {
  title: "DTE/SearchBar",
  component: SearchBar,
};

// const Template = (args) => <SearchBar />;
const Template = (args) => <p>tbd</p>;

export const Default = Template.bind({});
Default.args = {
  favorites: true,
  bookmarks: true,
};

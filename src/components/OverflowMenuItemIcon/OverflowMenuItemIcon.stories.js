import OverflowMenuItemIcon from "./OverflowMenuItemIcon";

export default {
  title: "DTE/OverflowMenuItemIcon",
  component: OverflowMenuItemIcon,
};

export const Primary = () => (
  <OverflowMenuItemIcon
    icon="IconText "
    label="labelText"
    helperText="helperText"
    title="<title>"
  />
);

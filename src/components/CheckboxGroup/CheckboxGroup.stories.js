import CheckboxGroup from "./CheckboxGroup";

export default {
  title: "DTE/CheckboxGroup",
  component: CheckboxGroup,
};

export const DemoCase = () => (
  <CheckboxGroup
    labelText="checkboxgroup"
    values={[
      { value: "1", labelText: "1" },
      { value: "2", labelText: "2" },
      { value: "3", labelText: "3" },
    ]}
  />
);

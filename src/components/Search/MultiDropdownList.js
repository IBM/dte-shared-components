import styled from "styled-components";

import { FormItem, FormLabel, SkeletonText } from "carbon-components-react";

import { MultiDropdownList as ReactiveSearchMultiDropdownList } from "@appbaseio/reactivesearch";
import { HelperText } from "../../index";

const StyledFormItem = styled(FormItem)`
  width: 100%;
  display: flex;
  flex-grow: 1;
  flex-shrink: 1;
  padding-right: 1rem;
  & .bx--multi-select__wrapper {
    width: 100%;
  }
  & .bx--multi-select.bx--list-box {
    position: relative;
    width: 100%;
    height: 2.5rem;
    max-height: 2.5rem;
    color: #161616;
    background-color: #f4f4f4;
    border: none;
    border-bottom-color: currentcolor;
    border-bottom-style: none;
    border-bottom-width: medium;
    border-bottom: 1px solid #8d8d8d;
    cursor: pointer;
    transition: all 70ms cubic-bezier(0.2, 0, 0.38, 0.9);
  }
  & .bx--multi-select.bx--list-box[aria-expanded="true"] {
    outline: 1px solid var(--cds-focus, #0f62fe);
  }
  & .bx--list-box__menu {
    border: none;
    outline: 1px solid var(--cds-focus, #0f62fe);
  }
`;

const MultiDropdownList = ({
  showCheckbox,
  labelText,
  helperText,
  title,
  wrap,
  ...rest
}) => {
  // create a render option to wrap the list in checkbox
  // if (showCheckbox) {}
  const dropdown = <ReactiveSearchMultiDropdownList {...rest} />;
  if (wrap) {
    return (
      <StyledFormItem>
        {title || labelText ? (
          <FormLabel>{title || labelText}</FormLabel>
        ) : null}
        {dropdown}
        {helperText ? (
          <HelperText className="bx--form__helper-text" source={helperText} />
        ) : null}
      </StyledFormItem>
    );
  }
  return dropdown;
};

MultiDropdownList.defaultProps = {
  size: 100,
  sortBy: "asc",
  queryFormat: "or",
  showCheckbox: true,
  showCount: true,
  showSearch: false,
  showFilter: true,
  URLParams: true,
  className: "bx--multi-select__wrapper bx--list-box__wrapper",
  innerClass: {
    title: "bx--label",
    select: "bx--multi-select bx--list-box",
    list: "bx--list-box__menu",
  },
  loader: <SkeletonText lineCount={1} width="100%" />,
  wrap: true, // should we wrap this in a form item?
};

export default MultiDropdownList;

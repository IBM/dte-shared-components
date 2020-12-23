import React from "react";
import { Form as CarbonForm } from "carbon-components-react";
import styled from "styled-components";

const Styled = styled.span`
  & .form {
    padding-top: 1.5rem;
    & .buttongroup,
    & .buttonset {
      padding-top: 1.5rem;
      & button {
        margin-right: 1rem;
      }
    }

    & .buttongroup.condensed,
    & .buttonset.condensed {
      padding-top: 0;
      & button {
        margin-right: 1px;
      }
    }

    & .bx--fieldset {
      & legend.bx--label {
        font-weight: 600;
        color: #c7c7c7;
        font-size: 1rem;
      }
    }

    & .bx--select,
    & .bx--text-input__field-outer-wrapper,
    & .bx--select-input__wrapper,
    & .bx--select-input,
    & .bx--text-area,
    & .bx--text-area__wrapper {
      width: 100%;
      max-width: 100%;
    }

    & textarea[disabled] {
      resize: unset;
    }

    & .bx--row {
      margin-bottom: 1.5rem;
      & > div[class^="bx--col-"] {
        padding-bottom: 1rem;
      }
    }

    & .bx--row.divider {
      padding-top: 1.5rem;
      border-top: 1px solid #c6c6c6;
    }

    & .bx--text-area:disabled {
      color: #c6c6c6;
    }

    & .bx--form-item {
      & .bx--row {
        width: 100%;
        margin-bottom: 0;
        [class^="bx--col"] {
          align-self: flex-end;
        }
      }
    }

    & .bx--dropdown__wrapper.bx--list-box__wrapper {
      width: 100%;
    }

    & .sortable-cards {
      display: flex;
      flex-wrap: wrap;
      margin-right: -1rem;
      margin-left: -1rem;
      overflow-y: auto;
      flex-grow: 1;
      list-style: none;
      margin: 0;
      padding: 0;
      width: 100%;
      & li {
        list-style: none;
        flex-grow: 1;
        margin: 0;
        padding: 0;
        width: 100%;
        & .bx--tile {
          height: 100%;
        }
      }
    }

    & .links__modal,
    & .platforms__modal {
      & .form {
        padding-top: 0;
        & .bx--grid {
          padding-left: 1.5rem;
          padding-right: 1.5rem;
        }
        & .stacked .bx--form-item + .bx--form-item {
          padding-top: 2rem;
        }
      }
    }
  }

  & .bx--modal {
    & .form {
      & .bx--grid {
        padding-left: 1rem;
        padding-right: 1rem;
      }
    }
  }
`;

const Form = (props) => {
  return (
    <Styled>
      <CarbonForm {...props} />
    </Styled>
  );
};

Form.defaultProps = {
  className: "form",
};

Form.propTypes = {
  ...CarbonForm.propTypes,
};

export default Form;

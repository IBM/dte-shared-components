import styled from "styled-components";

const SearchStyle = styled.div`
  & .leadspace.search {
    padding-bottom: 2rem;
  }

  & .search-container {
    position: -webkit-sticky;
    position: sticky;
    top: 48px;
    z-index: 2999;
    background: #fff;
    margin-top: 1rem;
    & [class^="bx--col"]:empty {
      display: none;
    }
    & .hidden {
      display: none;
    }
  }

  & .search-bar {
    display: flex;
    flex-direction: row;
    & .search {
      flex: 1 1 100%;
      margin-right: 1rem;
      padding-top: 0.5em;
      padding-bottom: 0.5em;
      input {
        padding: 0 1rem 0 3rem;
        box-sizing: border-box;
        margin: 0;
        font-size: 100%;
        font-family: inherit;
        vertical-align: initial;
        font-size: var(--cds-body-short-01-font-size, 0.875rem);
        font-weight: var(--cds-body-short-01-font-weight, 400);
        line-height: var(--cds-body-short-01-line-height, 1.125rem);
        letter-spacing: var(--cds-body-short-01-letter-spacing, 0.16px);
        outline: 2px solid transparent;
        outline-offset: -2px;
        background-color: var(--cds-field-01, #f4f4f4);
        width: 100%;
        height: 3rem;
        color: var(--cds-text-01, #161616);
        border: none;
        border-bottom-color: currentcolor;
        border-bottom-style: none;
        border-bottom-width: medium;
        border-bottom: 1px solid var(--cds-ui-04, #8d8d8d);
        transition: background-color 70ms cubic-bezier(0.2, 0, 0.38, 0.9),
          outline 70ms cubic-bezier(0.2, 0, 0.38, 0.9);
      }
      input:active,
      input:focus {
        outline: 2px solid var(--cds-focus, #0f62fe);
        outline-offset: -2px;
      }
    }
    & .bx--list-box {
      height: 3rem;
      max-height: 3rem;
    }
    & .search-buttons {
      flex: 1 1 5%;
    }
  }

  & .result-list-container {
    padding-top: 1em;
    & .bx--grid {
      max-width: 100%;
      display: flex;
      flex-wrap: wrap;
      padding-left: 1.5em;
      padding-right: 1.5em;
    }
    & .bx--structured-list {
      width: 98%;
      margin: 0 auto;
      & .bx--structured-list-td {
        a {
          text-decoration: none;
        }
      }
    }

    & .result-list-info {
      margin: 0 1.5rem 1rem 2rem;
      display: flex;
      flex-grow: 1;
      align-items: center;
      & .sort-options {
        align-self: flex-end;
      }
      & .result-stats {
        color: #777;
        font-size: 0.8em;
        flex-grow: 1;
        align-self: flex-start;
      }
    }

    & .markdown strong em {
      font-weight: 900;
      background-color: rgba(241, 194, 27, 0.05);
      transition: all 70ms cubic-bezier(0, 0, 0.38, 0.9);
    }
    & .markdown strong em:hover {
      background-color: rgba(241, 194, 27, 0.5);
    }
  }

  & .filters {
    border: 2px solid #e0e0e0;
    border-top: 2px solid #d7d7d7;
    background-color: #e7e7e7;
    background-image: linear-gradient(#e0e0e0, #e7e7e7);
    padding-top: 1em;
    padding-bottom: 2em;
    margin-top: 1em;
    margin-bottom: 1em;
    font-size: 0.9em;
    & .filters-buttonset {
      display: flex;
      justify-content: flex-end;
      margin: 0 -2em;
    }
    & .close-button {
      color: #161616;
    }
    & h2 {
      font-size: 1em;
      padding: 0;
      margin: 0;
      font-weight: 400;
    }
    & h2 + input {
      font-size: 0.9em;
      height: 2.5em;
    }
    & ul > li {
      min-height: 1.3rem;
      line-height: 1.3rem;
    }
    & [class^="bx--col"] {
      border: 1px dotted #d7d7d7;
      padding-bottom: 1em;
    }
    & [class^="bx--col"]:empty {
      display: none;
    }
    & .bx--radio-button-group.bx--radio-button-group--label-right {
      padding-bottom: 0;
    }
  }

  & .hidden {
    display: none;
    pointer-events: none;
  }

  & .fadein.hidden {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: opacity 1s ease-in-out;
    -moz-transition: opacity 1s ease-in-out;
    -webkit-transition: opacity 1s ease-in-out;
  }
  & .fadein {
    opacity: 1;
    visibility: visible;
  }

  & .result-list-container {
    margin-bottom: 2em;
  }

  & .overflow-hidden {
    overflow: hidden;
  }
`;

export default SearchStyle;

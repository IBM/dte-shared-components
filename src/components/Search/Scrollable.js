import styled from "styled-components";

const Scrollable = styled.div`
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 12rem;
  position: relative;
  overflow-y: auto;
  padding-bottom: 2rem;
  & li {
    width: 100%;
  }
  & label {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

export default Scrollable;

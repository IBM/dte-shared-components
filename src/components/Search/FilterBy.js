import styled from "styled-components";

const Styled = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 1rem;
  height: 100%;
`;

const FilterBy = ({ label }) => {
  return (
    <Styled>
      <p>{label}</p>
    </Styled>
  );
};

FilterBy.defaultProps = {
  label: "Filter by:",
};

export default FilterBy;

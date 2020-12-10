import ContentSection from "./ContentSection";

const CardSection = ({ mode, ...rest }) => {
  return <ContentSection {...rest} />;
};

CardSection.defaultProps = {
  heading: "",
};

export default CardSection;

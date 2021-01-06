import styled from "styled-components";

let Styled = styled.span`
  & .notification-wrapper {
    top: 100px;
    right: 10px;
    position: fixed;
    z-index: 1;
  }

  & .notification {
    right: 10px;
    position: relative;
    z-index: 1;
    display: flex;
  }
`;
const Notifications = ({ notifications = [] }) => {
  return (
    <Styled>
      <div className="notification-wrapper">{notifications.map((n) => n)}</div>
    </Styled>
  );
};

export default Notifications;

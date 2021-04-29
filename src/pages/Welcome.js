// Imports for styling
import styled from "styled-components";

const Welcome = () => {
  return (
    <StyledWelcome>
      <p>Welcome to Wallfair.</p>
      <a href="/auth">
        <button>Trade now!</button>
      </a>
    </StyledWelcome>
  );
};

// Styled Components
const StyledWelcome = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Welcome;

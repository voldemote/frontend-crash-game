// Imports for styling
import styled from "styled-components";

const Authentication = () => {
  return (
    <StyledAuthentication>
      <PlaceholderGoBack href="/">x</PlaceholderGoBack>
      <AuthenticationHeading>
        <p>
          Verify your <br />
          phone number
        </p>
      </AuthenticationHeading>
      <AuthenticationSubHeading>
        <p>
          We’ll send you a SMS with a 6-digit-code <br /> to verify your number.
        </p>
      </AuthenticationSubHeading>
    </StyledAuthentication>
  );
};

// Styled components
const StyledAuthentication = styled.div``;

const AuthenticationHeading = styled.div`
  width: 348px;
  height: 80px;
  margin: 109px 36px 25px 36px;
  p {
    /* font-family: PlusJakartaText; */
    font-size: 36px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.1;
    letter-spacing: normal;
    color: #0e0927;
  }
`;

const AuthenticationSubHeading = styled.div`
  width: 348px;
  height: 48px;
  margin: 24.4px 36px 56px 36px;
  p {
    /* font-family: PlusJakartaText; */
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    color: #0e0927;
  }
`;

const PlaceholderGoBack = styled.a`
  position: absolute;
  top: 10px;
  right: 10px;
`;

export default Authentication;

// Import of images and icons
import xCircle from "../data/icons/x-circle.svg";

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
      <AuthenticationPhoneBox>
        <div></div>
        <PhoneBoxNumberInput type="number" />
        <PhoneBoxInputDelete src={xCircle} alt="x" />
      </AuthenticationPhoneBox>
    </StyledAuthentication>
  );
};

// Styled components
const StyledAuthentication = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const AuthenticationHeading = styled.div`
  width: 84%;
  height: 80px;
  margin: 109px 8% 0 8%;
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
  width: 84%;
  height: 48px;
  margin: 24.4px 8% 0 8%;
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

const AuthenticationPhoneBox = styled.div`
  width: 84%;
  height: 60px;
  display: flex;
  align-items: center;
  margin: 56px 8% 0 8%;
  padding: 15px 20px;
  border-radius: 8px;
  background-color: #f1f2f6;
`;

const PhoneBoxNumberInput = styled.input`
  margin: 3px 16% 3px 8.5%;
  /* font-family: PlusJakartaText; */
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: #0e0927;
  background-color: #f1f2f6;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid black;
  border-radius: 0;
  &:focus {
    outline: none;
  }
`;

const PhoneBoxInputDelete = styled.img`
  width: 22px;
`;

const PlaceholderGoBack = styled.a`
  position: absolute;
  top: 10px;
  right: 10px;
`;

export default Authentication;

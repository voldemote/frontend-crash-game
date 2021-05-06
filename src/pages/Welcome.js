// Imports from React-Router-Dom
import { useHistory } from "react-router-dom";

// Import of icons and images
import darkModeLogo from "../data/images/logo-darkmode.svg";

// Imports for styling
import styled from "styled-components";
import { NextBtn } from "../themes/CommonStyle";

const Welcome = () => {
  const history = useHistory();
  return (
    <StyledWelcome>
      <WelcomeContent>
        <WelcomeContentHolder>
          <WelcomeLogo src={darkModeLogo} alt="" />
          <WelcomeTitle>
            Hello, we are WallFair! <br /> Simple betting <br /> for{" "}
            <HighLight> everyone </HighLight> <br /> and everything.
          </WelcomeTitle>
          <WelcomeCTA onClick={() => history.push("/auth")}>
            Let's trade!
          </WelcomeCTA>
          <WelcomeSmallPrint>
            By continuing I accept the Term and Conditions and privacy policy.
            Also I confirm that I am over 18 years old.
          </WelcomeSmallPrint>
        </WelcomeContentHolder>
      </WelcomeContent>
    </StyledWelcome>
  );
};

// Styled components
const StyledWelcome = styled.div`
  width: 100%;
  height: 100%;
`;

const WelcomeContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.colors.primary};
`;

const WelcomeContentHolder = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WelcomeLogo = styled.img`
  width: 150px;
  margin-top: 62px;
`;

const WelcomeTitle = styled.h1`
  margin-top: 53px;
  font-size: 40px;
  font-family: ${(props) => props.theme.fonts.bold};
  line-height: 46px;
  color: white;
`;

const HighLight = styled.span`
  color: #e2ff54;
`;

const WelcomeCTA = styled(NextBtn)`
  width: 100%;
  margin-top: 25vh;
`;

const WelcomeSmallPrint = styled.p`
  width: 100%;
  margin: 25px 0 36px 0;
  font-size: 13px;
  font-family: ${(props) => props.theme.fonts.regular};
  line-height: 19.6px;
  letter-spacing: 0;
  color: white;
`;

export default Welcome;

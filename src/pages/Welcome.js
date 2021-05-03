import React from 'react';
import styled from 'styled-components';

import darkModeLogo from '../data/images/logo-darkmode.svg';

const Welcome = () => {
  return (
    <WelcomeBackGround>
      <WelcomeMask>
        <TopLayer>
          <Logo src={darkModeLogo} alt="" />

          <WelcomeTitle>
            Hello, we are  WallFair!
          </WelcomeTitle>
          <WelcomeTitle>
            Simple betting for <HighLight> everyone </HighLight> and everything.
          </WelcomeTitle>
        </TopLayer>

        <BottomLayer>
          <TradeButton href="/auth">
            Let's trade!
          </TradeButton>
          <WelcomeDescription>
            By continuing I accept the Term and Conditions and privacy policy. Also I confirm that I am over 18 years old.
          </WelcomeDescription>
        </BottomLayer>
      </WelcomeMask>
    </WelcomeBackGround>
  );
};

// Styled Components
const WelcomeBackGround = styled.div`
  width: 100%;
  height: 100%;
  background: url('images/welcome_bg.png');
  background-repeat: no-repeat;
  background-size: cover;
`;

const WelcomeMask = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 50px 40px;
  width: 100%;
  height: 100%;
  background-color: #0E0927;
  opacity: 0.86;
`;

const TopLayer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Logo = styled.img`
  margin-bottom: 50px;
  width: 250px;
`;

const WelcomeTitle = styled.h1`
  display: flex;
  justify-content: center;
  width: 100%;
  color: white;
  font-size: 4vw;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  text-align: center;
`;

const HighLight = styled.span`
  margin: 0 1vw;
  color: #E2FF54;
`;

const BottomLayer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const TradeButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
  padding: 15px 80px;
  min-width: 200px;
  background-color: #E2FF54;
  color: black;
  font-size: 20px;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  text-decoration: none;
  
  &:hover {
    cursor: pointer;
    background-color: #f6ff54;
  }
`;

const WelcomeDescription = styled.p`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  color: white;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
`;

export default Welcome;

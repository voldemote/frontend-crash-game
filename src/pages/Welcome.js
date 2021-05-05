import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import darkModeLogo from 'data/images/logo-darkmode.svg';
import { NextBtn } from 'themes/CommonStyle';

const Welcome = () => {
  const history = useHistory();
  return (
    <BackGround>
      <Mask>
        <Layer>
          <Logo src={darkModeLogo} alt="" />

          <Title>
            Hello, we are  WallFair!
          </Title>
          <Title>
            Simple betting for <HighLight> everyone </HighLight> and everything.
          </Title>
        </Layer>

        <Layer>
          <TradeButton onClick={() => history.push('/auth')}>
            Let's trade!
          </TradeButton>

          <Description>
            By continuing I accept the Term and Conditions and privacy policy. Also I confirm that I am over 18 years old.
          </Description>
        </Layer>
      </Mask>
    </BackGround>
  );
};

// Style
const BackGround = styled.div`
  width: 100%;
  height: 100%;
  background: url('images/welcome_bg.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}px) {
    background-position: 35%;
    background-size: 200% 100%;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.xs}px) {
    background-position: 35%;
    background-size: 340% 100%;
  }
`;

const Mask = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 60px 0;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colors.primary};
  opacity: 0.86;
  
  @media (max-width: ${props => props.theme.breakpoints.xxs}px) {
    padding: 50px 0;
  }
`;

const Layer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 35px;
`;

const Logo = styled.img`
  margin-bottom: 50px;
  width: 150px;
  
  @media (max-width: ${props => props.theme.breakpoints.xxs}px) {
    margin-bottom: 20px;
  }
`;

const Title = styled.h1`
  color: white;
  font-size: 40px;
  font-family: ${props => props.theme.fonts.bold};
  line-height: 46px;
  
  @media (max-width: ${props => props.theme.breakpoints.xxs}px) {
    font-size: 30px;
    line-height: 35px;
  }
  
  @media (min-width: ${props => props.theme.breakpoints.xs}px) {
    text-align: center;
  }
`;

const HighLight = styled.span`
  padding: 0 10px;
  color: #E2FF54;
  
  @media (max-width: ${props => props.theme.breakpoints.xxs}px) {
    padding: 0 5px;
  }
`;

const TradeButton = styled(NextBtn)`
  margin-bottom: 30px;
  width: 250px;
  
  @media (max-width: ${props => props.theme.breakpoints.xs}px) {
    width: 100%;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.xxs}px) {
    height: 45px;
  }
`;

const Description = styled.p`
  margin-bottom: 30px;
  color: white;
  font-size: 13px;
  font-family: ${props => props.theme.fonts.regular};
  line-height: 19.6px;
  letter-spacing: 0;
  
  @media (max-width: ${props => props.theme.breakpoints.xxs}px) {
    margin-bottom: 10px;
    font-size: 9px;
    line-height: 12px;
  }
  
  @media (min-width: ${props => props.theme.breakpoints.xs}px) {
    margin: 0 20px;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
  }
  
  @media (min-width: ${props => props.theme.breakpoints.sm}px) {
    margin: 0 20px;
    font-size: 18px;
    line-height: 25px;
    text-align: center;
  }
`;

export default Welcome;

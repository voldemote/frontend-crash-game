// Imports from React
import { Fragment } from "react";

// Import of icons and images
import checkIcon from "../data/icons/check-icon.svg";

// Imports for styling
import styled from "styled-components";

const StepBar = ({ size, step }) => {
  return (
    <StyledStepBar>
      <StepBarLine />
      {[...Array(size)].map((arr, index) => (
        <Fragment key={index}>
          {index < step ? (
            <StepBarItemComplete>
              <StepCompleteIcon src={checkIcon} alt="" />
            </StepBarItemComplete>
          ) : (
            <StepBarItemIncomplete>
              {index === step ? (
                <StepBarActiveItem>{index + 1}</StepBarActiveItem>
              ) : (
                <StepBarInactiveItem>{index + 1}</StepBarInactiveItem>
              )}
            </StepBarItemIncomplete>
          )}
        </Fragment>
      ))}
    </StyledStepBar>
  );
};

const StyledStepBar = styled.div`
  position: relative;
  width: 60%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: transparent;
`;

const StepBarLine = styled.div`
  width: 100%;
  height: 1px;
  position: absolute;
  top: 50%;
  left: 0;
  background-color: ${(props) => props.theme.colors.gray_light};
  z-index: -1;
`;

const StepBarItemComplete = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StepCompleteIcon = styled.img`
  width: 100%;
  height: 100%;
`;

const StepBarItemIncomplete = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${(props) => props.theme.colors.gray_light};
  border-radius: 50%;
  background-color: white;
`;

const StepBarActiveItem = styled.span`
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: 16px;
  line-height: 21px;
  color: ${(props) => props.theme.colors.primary};
`;

const StepBarInactiveItem = styled.span`
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: 16px;
  line-height: 21px;
  color: ${(props) => props.theme.colors.gray_light};
`;

export default StepBar;

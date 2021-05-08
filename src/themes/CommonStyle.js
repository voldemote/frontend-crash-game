// Dependencies
import styled from "styled-components";

// Export body
export const NextBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.yellow};
  color: ${(props) => props.theme.colors.primary};
  font-size: 20px;
  font-family: ${(props) => props.theme.fonts.bold};
  letter-spacing: 0;
  &:hover {
    cursor: pointer;
  }
`;

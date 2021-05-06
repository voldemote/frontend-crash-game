// Imports from React
import { useEffect } from "react";

// Imports for styling
import styled from "styled-components";

const CodeField = ({ fieldLength, value, setValue }) => {
  const step = value.length;

  // Using useEffect to recognize if user presses keys
  useEffect(() => {
    window.addEventListener("keydown", onKeyDownHandler);
    return () => {
      window.removeEventListener("keydown", onKeyDownHandler);
    };
  });

  // Function to handle if user presses keys
  const onKeyDownHandler = (e) => {
    let key = Number.parseInt(e.key);
    if (step < fieldLength && key > -1) {
      let temp = [...value];
      temp.push(key);
      setValue(temp);
    }
    if (e.key === "Backspace") {
      let temp = [...value];
      temp.pop();
      setValue(temp);
    }
  };

  return (
    <StyledCodeField>
      {[...Array(fieldLength)].map((arr, index) => (
        <CodeFieldItem key={index}>
          {index > step - 1 ? (
            <InactiveItem />
          ) : (
            <>
              {index === step - 1 ? (
                <ActiveItem>{value[index]}</ActiveItem>
              ) : (
                <CompletedItem>{value[index]}</CompletedItem>
              )}
            </>
          )}
        </CodeFieldItem>
      ))}
    </StyledCodeField>
  );
};

const StyledCodeField = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  width: 100%;
  height: 60px;
`;

const CodeFieldItem = styled.div`
  height: 72px;
  flex: 1;
  margin: 0 4px;
  font-family: ${(props) => props.theme.fonts.light};
  font-size: 36px;
  line-height: 39.6px;
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
`;

const InactiveItem = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: none;
  color: black;
  background-color: ${(props) => props.theme.colors.gray_light};
`;

const ActiveItem = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${(props) => props.theme.colors.primary_light};
  border-radius: 10px;
  color: black;
  background-color: white;
  box-shadow: 0 0 0 2px ${(props) => props.theme.colors.yellow};
`;

const CompletedItem = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${(props) => props.theme.colors.gray_light};
  border-radius: 10px;
  color: black;
  background-color: white;
`;

export default CodeField;

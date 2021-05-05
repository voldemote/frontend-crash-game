import React, { useEffect } from 'react';
import styled from 'styled-components';

const CodeField = ({fieldLength, value, setValue}) => {
  const step = value.length;

  useEffect(() => {
    window.addEventListener('keydown', onKeyDownHandler);
    return () => {
      window.removeEventListener('keydown', onKeyDownHandler);
    }
  });

  const onKeyDownHandler = (e) => {
    let key = Number.parseInt(e.key);
    if (step < fieldLength && key > -1) {
      let temp = [...value];
      temp.push(key);
      setValue(temp);
    }
    if (e.key === 'Backspace') {
      let temp = [...value];
      temp.pop();
      setValue(temp);
    }
  };

  return (
    <CodeFieldWrapper>
      {[...Array(fieldLength)].map((arr, index) => (
        <Item key={index}>
          {index > step -1 ?
            <InActiveItem />
            :
            <>
              {index === step -1 ?
                <ActiveItem>{value[index]}</ActiveItem> :
                <CompleteItem>{value[index]}</CompleteItem>
              }
            </>
          }
        </Item>
      ))}
    </CodeFieldWrapper>
  );
};

const CodeFieldWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  width: 100%;
  height: 60px;
`;

const Item = styled.div`
  flex: 1;
  margin: 0 4px;
  height: 72px;
  font-family: ${props => props.theme.fonts.light};
  font-size: 36px;
  line-height: 39.6px;
  
  &:first-child {
    margin-left: 0;
  }
  
  &:last-child {
    margin-right: 0;
  }
`;

const InActiveItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: none;
  color: black;
  background-color: ${props => props.theme.colors.gray_light};
`;

const ActiveItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: 2px solid ${props => props.theme.colors.primary_light};
  color: black;
  background-color: white;
  box-shadow: 0 0 0 2px ${props => props.theme.colors.yellow};
`;

const CompleteItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: 2px solid ${props => props.theme.colors.gray_light};
  color: black;
  background-color: white;
`;

export default CodeField;

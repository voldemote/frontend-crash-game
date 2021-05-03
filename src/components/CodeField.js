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
  margin: 0 10px;
  height: 60px;
  font-family: 'Poppins', sans-serif;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  
  &:nth-first-child {
    margin-left: 0;
  }
  
  &:nth-last-child {
    margin-right: 0;
  }
`;

const InActiveItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  border: none;
  height: 60px;
  color: black;
  background-color: #80808059;
`;

const ActiveItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  border: 1px solid #16c1b1b5;
  height: 60px;
  color: black;
  background-color: #80808014;
`;

const CompleteItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  border: 1px solid #80808059;
  height: 60px;
  color: black;
  background-color: #80808014;
`;

export default CodeField;

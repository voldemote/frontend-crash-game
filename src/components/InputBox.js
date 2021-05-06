// Import of icons and images
import xCircle from "../data/icons/x-circle.svg";

// Imports for styling
import styled from "styled-components";

// Import of library to create phone number input
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const InputBox = ({
  type,
  placeholder,
  country,
  setCountry,
  hasCountry,
  value,
  setValue,
}) => {
  return (
    <StyledInputBox>
      {hasCountry && (
        <PhoneInput
          containerStyle={{ display: "flex", alignItems: "center", width: 100 }}
          inputStyle={{
            width: 100,
            height: 40,
            backgroundColor: "#f1f2f6",
            fontSize: 16,
            outline: "none",
            border: "none",
          }}
          dropdownStyle={{
            height: 300,
            width: 200,
            overflowY: "auto",
            backgroundColor: "white",
            borderRadius: 20,
          }}
          searchStyle={{ width: 140 }}
          value={country}
          inputProps={{ name: "phoneNumber" }}
          onChange={(country) => setCountry(country)}
          enableClickOutside={true}
          enableSearch={true}
        />
      )}
      <Input
        placeholder={placeholder}
        type={type}
        value={value}
        min={0}
        onChange={(e) => setValue(e.target.value)}
      />
      <InputDeleteIcon src={xCircle} alt="x" onClick={() => setValue("")} />
    </StyledInputBox>
  );
};

const StyledInputBox = styled.div`
  width: 100%;
  height: 60px;
  position: relative;
  display: flex;
  align-items: center;
  padding: 15px 20px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.gray_light};
`;

const Input = styled.input`
  min-width: 100px !important;
  flex: 1;
  margin-right: 20px;
  border: none;
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: 16px;
  line-height: 24px;
  color: ${(props) => props.theme.colors.primary};
  background-color: ${(props) => props.theme.colors.gray_light};
  &:focus {
    outline: none;
  }
`;

const InputDeleteIcon = styled.img`
  width: 25px;
  height: 25px;
  position: absolute;
  right: 17px;
  top: 17px;
  &:hover {
    cursor: pointer;
  }
`;

export default InputBox;

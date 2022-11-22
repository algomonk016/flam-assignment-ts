import { RadioInputProps } from "components/Header/types";

const RadioInput = (props: RadioInputProps): JSX.Element => {
  const { radio, onSelectOption } = props;
  const { title, value } = radio;

  return (
    <>
      <input onChange={() => onSelectOption(radio.value)} type={'radio'} name={'model-position'} value={value} /> 
      <span style={{marginRight: '10px'}} >{title}</span>
    </>
  )
}

export default RadioInput;
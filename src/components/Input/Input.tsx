import React from 'react';
import style from './Input.module.css';

type InputProps = {
  name?: string,
  placeHolder?: string,
  type?: string,
  componentStyle?: React.CSSProperties,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void 
}


function Input( { name, placeHolder, type, componentStyle, onChange }: InputProps ) {
  return (
    <input
      name={name}
      className={style.input}
      type={type}
      placeholder={placeHolder}
      style={componentStyle}
      onChange={onChange}
      required
    >
      
    </input>
  );
}

export default Input;
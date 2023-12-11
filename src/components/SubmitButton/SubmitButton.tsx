import React from 'react';
import style from './SubmitButton.module.css';

type SubmitButtonProps = {
  name?: string,
  value?: string,
  componentStyle?: React.CSSProperties,
}

function SubmitButton( { name, value, componentStyle }: SubmitButtonProps ) {
  return (
    <input
      name={name}
      className={style["submit-button"]}
      value={value}
      type='submit'
      style={componentStyle}
    >

    </input>
  );
}

export default SubmitButton;
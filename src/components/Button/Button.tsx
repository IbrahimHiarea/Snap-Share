import React from 'react';
import style  from './Button.module.css';

type ButtonProps = {
  name?: string,
  value?: string,
  componentStyle?: React.CSSProperties,
  onClick?: () => void
  // onClick?: (event: React.MouseEvent<HTMLButtonElement>, id: number) => void
  // onChange?: (event: React.ChangeEvent<HTMLButtonElement>) => void 
}

function Button( { name, value, componentStyle, onClick }: ButtonProps ) {
  return (
    <button 
      className={style.button}
      name={name}
      style={componentStyle}
      onClick={onClick}
    >
      {value}
    </button>
  )
}

export default Button;
import React from 'react';
import './index.css';

const Button = ({
     type = 'btn',
     name = 'Button',
     borderless = false,
     width = '100px',
     height = '40px',
     borderRadiusValue = '10px',
     bgColor = '#fff',
     textColor = '#000',
     shadow = false,
     shadowValue = 'rgba(99,99,99,0.2)',
     onClick,
     disabled = false,
     fontWeight = '',
     id = '',
     className = 'btn',
}) => {
     const buttonProps = {
          style: {
               width: width,
               height: height,
               borderRadius: borderless ? borderRadiusValue : '0px',
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
               backgroundColor: disabled ? '#d2d2d2' : bgColor,
               color: textColor,
               boxShadow: shadow ? `${shadowValue} 0px 2px 8px 0px` : 'none',
               cursor: disabled ? 'not-allowed' : 'pointer',
               fontWeight: fontWeight,
               // opacity: disabled ? '0.5' : '1',
          },
     };

     const _setId = () => {
          let btn_id = id;
          if (name === 'Submit') btn_id = 'create_submit_btn';
          if (name === 'Reset') btn_id = 'create_reset_btn';
          if (name === 'Mapping') btn_id = 'mapping_submit_btn';
          return btn_id;
     };

     if (type === 'submit') {
          return (
               <button
                    className={className}
                    id={_setId()}
                    label={name}
                    type={'submit'}
                    {...buttonProps}
                    onClick={!disabled ? onClick : () => {}}>
                    {name}
               </button>
          );
     } else {
          return (
               <div
                    id={_setId()}
                    className={className}
                    label={name}
                    {...buttonProps}
                    onClick={!disabled ? onClick : () => {}}>
                    {name}
               </div>
          );
     }
};

export default Button;

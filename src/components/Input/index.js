import React from 'react';
import './index.css';
import { IF } from '../../service/util/Conditional';

const Validation_Regex = {
     NUMBER: /^[0-9 ()-]*$/,
     STRING: /^[a-zA-Z() ]*$/,
};

const Input = ({
     name = 'Input',
     placeholder = '',
     width = '200px',
     height = '90px',
     inputHeight = '40px',
     keyname,
     style,
     minLength,
     maxLength,
     onChange,
     value = '',
     type = 'text',
     error = false,
     disabled = false,
     avoidSplChar = false,
     toast = false,
     toastMsg = 'Require field',
     important = false,
     inputType = 'mixedString',
     max,
     min,
     testReg,
     id = 'input_id',
     dateFormat = '',
     inputStyle = {}
}) => {
     const inputProps = {
          style: { ...style, width: width, height: height },
     };

     const _handleOnChange = (e) => {
          if (inputType === 'number') {
               if (Validation_Regex.NUMBER.test(Number(e.target.value))) {
                    onChange(keyname, e.target.value.trim());
               }
          } else if (inputType === 'string') {
               if (Validation_Regex.STRING.test(e.target.value)) {
                    onChange(keyname, e.target.value);
               }
          } else if (inputType === 'particularSpecl' && testReg !== '') {
               if (testReg.test(e.target.value)) {
                    onChange(keyname, e.target.value);
               }
          } else if (inputType === 'mixedString') {
               let value = avoidSplChar ? e.target.value.replace(/[^\w\s]/gi, '') : e.target.value;
               if (type === 'email') {
                    onChange(keyname, String(value).toLowerCase());
               } else {
                    onChange(keyname, value);
               }
          } else {
               e.preventDefault();
          }
          // console.log(e.target.validity.valid);
          // if (e.target.validity.valid) {
          //      let value = avoidSplChar ? e.target.value.replace(/[^\w\s]/gi, '') : e.target.value;
          //      onChange(keyname, value);
          // } else {
          //      e.preventDefault();
          // }
     };

     return (
          <div className='container-input-container' {...inputProps}>
               {toast && <div className='container-input-toast-con'>{toastMsg}</div>}
               <div className={`container-input-name-block`}>
                    {name} {important && <span className='important-field'>*</span>}{' '}
               </div>
               <IF condition={type === 'textarea'}>
                    <textarea
                         type={type}
                         name={name}
                         label={name}
                         id={id}
                         pattern={dateFormat}
                         className={`container-input ${error ? 'error-field' : ''}`}
                         placeholder={placeholder !== '' ? placeholder : name}
                         style={{ height: inputHeight, ...inputStyle }}
                         onChange={_handleOnChange}
                         value={value}
                         disabled={disabled}
                         max={max}
                         minLength={minLength}
                         maxLength={maxLength}
                         min={min}
                    // title={'input_component'}
                    />
               </IF>
               <IF condition={type !== 'textarea'}>
                    <input
                         type={type}
                         name={name}
                         label={name}
                         id={id}
                         pattern={dateFormat}
                         className={`container-input ${error ? 'error-field' : ''}`}
                         placeholder={placeholder !== '' ? placeholder : name}
                         style={{ height: inputHeight, ...inputStyle }}
                         onChange={_handleOnChange}
                         value={value}
                         disabled={disabled}
                         max={max}
                         minLength={minLength}
                         maxLength={maxLength}
                         min={min}
                    // title={'input_component'}
                    />
               </IF>
          </div >
     );
};

export default Input;

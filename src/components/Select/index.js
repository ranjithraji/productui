import React from 'react'
import Select from 'react-select';
import './index.css'

const InputSelect = (props) => {

    let { id, options, value, onSelect, label, field, placeholder, keyname, important, name, toastMsg, toast, error, width, height, style, title, disabled = false, titleStyle } = props;


    const order = (a, b) => {
        return a.label - b.label;
    }

    const _onOptions = () => options.map(x => { return { label: x[label], value: x[field] } });

    const optionSelectProps = {
        style: { ...style, width: width, height: height },
    };

    const titleStyleObject = {
        style: titleStyle
    }

    const colourStyles = {
        control: styles => ({
            ...styles, backgroundColor: 'white', fontSize: 12,
            textAlign: 'left'
        }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                fontSize: 12,
                textAlign: 'left'
            };
        },
        placeholder: styles => ({ ...styles, fontSize: '12px' }),
    };

    return (
        <div className={`panel-option-select-container`} id={id || 'select'} {...optionSelectProps}>
            {toast && <div className='panel-option-select-toast-con'>{toastMsg}</div>}
            {title && (
                <div className={`panel-option-select-name-block`} {...titleStyleObject}>
                    {name} {important && <span className='important-field'>*</span>}
                </div>
            )}

            <Select
                classNamePrefix={"component_react_select"}
                className={`panel-option-select ${error ? 'error-field' : ''}`}
                options={Array.isArray(options) && _onOptions().sort(order)}
                placeholder={placeholder && placeholder}
                value={value}
                styles={colourStyles}
                onChange={(e) => onSelect(keyname, e)}
                isDisabled={disabled}
            />
        </div>
    )
}

export default InputSelect
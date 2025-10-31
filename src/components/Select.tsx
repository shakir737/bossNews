// src/components/SelectField.tsx

import React from 'react';


const SelectField: React.FC<any> = ({
  name,
  label,
  options,
  value,
  onChange,
  required = false,
  disabled = false,
  placeholder = "Select an option",
}) => {

  // Handle change event and pass the value up as the correct type
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // Note: HTML select values are always strings. 
    // We'll trust the consumer to handle type conversion if necessary, 
    // but often, the `value` prop will be typed as 'string' for simplicity 
    // in form handling libraries. For this example, we keep it flexible.
    onChange(event.target.value);
  };

  return (
    <div className="select-field-container" style={{ marginBottom: '16px' }}>
      <label htmlFor={name} style={{ display: 'block', fontWeight: 'bold' }}>
        {label}
        {required && <span style={{ color: 'red', marginLeft: '4px' }}>*</span>}
      </label>
      
      <select
        id={name}
        name={name}
        value={value ?? ''} // Use empty string if value is undefined for controlled components
        onChange={handleChange}
        required={required}
        disabled={disabled}
        className="select-field"
        style={{
          width: '100%',
          padding: '8px',
          marginTop: '4px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          backgroundColor: disabled ? '#f0f0f0' : 'white',
        }}
      >
        {/* Placeholder Option */}
        <option value="" disabled={required}>
          {placeholder}
        </option>

        {/* Dynamic Options Rendering */}
        {options.map((option: any) => (
          <option 
            key={option.id} 
            value={option.id}
          >
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
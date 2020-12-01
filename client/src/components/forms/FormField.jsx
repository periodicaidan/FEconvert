import React from 'react';

export default function FormField({ label, type='text', validator, errorMessage, icon, value, onChange, spellCheck=true }) {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className={`control ${icon && 'has-icons-left'}`}>
        <input 
          {...{ type, value, onChange, spellCheck }}
          className={`input ${validator && (validator() || 'is-danger')}`}
        />
        {icon && 
          <span className="icon is-left is-small">
            <i className={`fas fa-${icon}`}></i>
          </span>
        }
      </div>
      {validator && (validator() || <small class="help is-danger">{errorMessage}</small>)}
    </div>
  )
}
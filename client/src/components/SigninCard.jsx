import React, { useState } from 'react';

export default function SigninCard() {

  const handleSignupFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="columns is-centered">
      <div className="column is-half">
        <div className="card">
          <div className="card-content">
            <div className="columns">

              <div className="column">
                <LoginForm />
              </div>

              <div className="column">
                <form onSubmit={handleSignupFormSubmit}></form>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginForm() {
  const EMAIL_REGEX = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
  
  const [fields, setFields] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const setField = (fieldName, value) => 
    setFields({ ...fields, [fieldName]: value });

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const emailIsInvalid = () => 
    fields.email !== '' && !EMAIL_REGEX.test(fields.email.trim());

  const passwordsDoNotMatch = () => 
    fields.password !== '' && fields.confirmPassword !== '' && fields.password !== fields.confirmPassword;
  
  const formIsValid = () => 
    fields.username !== '' && fields.email !== '' && fields.password !== '' && fields.password !== '' &&
      !emailIsInvalid() && !passwordsDoNotMatch();

  return (
    <form onSubmit={handleFormSubmit}>
      <FormField
        label="Username"
        value={fields.username}
        onChange={e => setField('username', e.target.value)}
        icon="user"
        spellCheck={false}
      />

      <FormField 
        label="Email"
        type="email"
        value={fields.email}
        onChange={e => setField('email', e.target.value)}
        spellCheck={false}
        validator={() => !emailIsInvalid()}
        icon="envelope"
      />

      <FormField 
        label="Password"
        type="password"
        value={fields.password}
        onChange={e => setField('password', e.target.value)}
        icon="lock"
      />

      {/* <div className="field">
        <label className="label">Confirm Password</label>
        <div className="control has-icons-left">
          <input 
            type="password" 
            className={`input ${passwordsDoNotMatch() && 'is-danger'}`} 
            value={fields.confirmPassword}
            onChange={e => setField('confirmPassword', e.target.value)} 
          />
          <span className="icon is-left is-small"><i className="fas fa-key  "></i></span>
        </div>
        {passwordsDoNotMatch() && <small class="help is-danger">Passwords must match!</small>}
      </div> */}

      <FormField 
        label="Confirm Password"
        type="password"
        value={fields.confirmPassword}
        onChange={e => setField('confirmPassword', e.target.value)}
        icon="key"
        validator={() => !passwordsDoNotMatch()}
        errorMessage="Passwords must match!"
      />

      <button className="button is-success" disabled={!formIsValid()}>
        Sign Up!
      </button>
    </form>
  )
}

function FormField({ label, type='text', validator, errorMessage, icon, value, onChange, spellCheck=true }) {
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
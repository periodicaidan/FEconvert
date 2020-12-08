import React, { useState } from 'react';
import FormField from './FormField';

const SIGNUP_ENDPOINT = '/api/signup';

export default function LoginForm() {
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

    fetch(SIGNUP_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: fields.email,
        password: fields.password,
        username: fields.username,
      }),
    })
      .then(res => {
        if (res.status === 200) {
          window.location.replace('/files')
        }
      })
      .catch(console.error);
  };

  const emailIsInvalid = () => 
    fields.email !== '' && !EMAIL_REGEX.test(fields.email.trim());

  const passwordsDoNotMatch = () => 
    fields.password !== '' && fields.confirmPassword !== '' && fields.password !== fields.confirmPassword;
  
  const formIsValid = () => 
    fields.username !== '' && fields.email !== '' && fields.password !== '' && fields.password !== '' &&
      !emailIsInvalid() && !passwordsDoNotMatch();

  return <>
    <h2 className="title is-4">Sign Up</h2>

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
  </>
}
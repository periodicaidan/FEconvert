import React, { useState } from 'react';
import FormField from './FormField';

const LOGIN_ENDPOINT = '/api/login';

export default function SignupForm() {
  const [fields, setFields] = useState({
    username: '',
    password: '',
  });

  const setField = (fieldName, value) => 
    setFields({ ...fields, [fieldName]: value });

  const handleFormSubmit = e => {
    e.preventDefault();

    fetch(LOGIN_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(fields)
    })
      .then(res => {
        if (res.status === 200) {
          window.location.replace('/files');
        }
      })
      .catch(console.error);
  }

  const formIsValid = () => 
    fields.username !== '' && fields.password !== '';

  return <> 
    <h2 className="title is-4">Log In</h2>
    <form onSubmit={handleFormSubmit}>
      <FormField 
        label="Username"
        icon="user"
        value={fields.username}
        onChange={e => setField('username', e.target.value)}
        spellCheck={false}
      />

      <FormField 
        label="Password"
        type="password"
        icon="lock"
        value={fields.password}
        onChange={e => setField('password', e.target.value)}
      />

      <button type="submit" className="button is-success" disabled={!formIsValid()}>Log in</button>
    </form>
  </>
}
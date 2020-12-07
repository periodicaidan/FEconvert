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

    fetch({
      url: LOGIN_ENDPOINT,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: fields
    })
      .then(res => {
        console.log('Logged in!')
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
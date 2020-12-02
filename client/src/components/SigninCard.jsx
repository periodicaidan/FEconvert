import React, { useState } from 'react';
import LoginForm from './forms/LoginForm';
import SignupForm from './forms/SignupForm';

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
                <SignupForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



import React, { useState } from 'react';
import LoginForm from './forms/LoginForm';

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



import React, { useState } from 'react';
import LoginForm from './forms/LoginForm';
import SignupForm from './forms/SignupForm';
import NicelySpaced from './NicelySpaced';

export default function SigninCard() {
  return (
    <NicelySpaced width="half">
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
    </NicelySpaced>
  );
}



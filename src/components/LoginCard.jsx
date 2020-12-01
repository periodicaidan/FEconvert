import React from 'react';

export default function LoginCard() {
  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="columns is-centered">
      <div className="column is-half">
        <div className="card">
          <div className="card-content">
            <form onSubmit={handleFormSubmit}>
              
              <div className="field">
                <label className="label">Username</label>
                <div className="control">
                  <input className="input" type="text" />
                </div>
              </div>

              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input className="input" type="password" />
                </div>
              </div>

              <div className="field">
                <label className="label">Confirm Password</label>
                <div className="control">
                  <input className="input" type="password" />
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
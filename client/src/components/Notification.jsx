import React from 'react';

export default function Notification({ type, light, dismissable, onDismiss, children }) {
    return (
        <div className={`notification ${type && 'is-' + type} ${light && 'is-light'}`}>
            {dismissable && <button className="delete" onClick={onDismiss}></button>}
            {children}
        </div>
    )
}
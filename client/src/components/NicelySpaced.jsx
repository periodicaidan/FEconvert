import React from 'react';

/**
 * It's an element that goes in the main portion of the page (below the nav, above the footer) that
 * has a single child (usually a card) that it keeps centered and spaced away from the nav. 
 * 
 * I couldn't think of a better name :P 
 * @param {*} param0 
 */
export default function NicelySpaced({ width, children }) {
    return (
        <div className="columns is-centered">
            <div className={`column is-${width} mt-6`}>
                {children}
            </div>
        </div>
    );
}
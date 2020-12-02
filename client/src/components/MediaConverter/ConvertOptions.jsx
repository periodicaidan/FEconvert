import React, { useState, useReducer, useContext } from 'react';
import MediaTypes, { MediaType, InputMediaContext } from './MediaTypes';
import { convertOptionsSubject } from './ConvertOptionsSubject';

/**
 * @param {MediaType} mediaType 
 */
function mediaTypeToOptionElement(mediaType) {
  return <option value={mediaType.extension}>{mediaType.fullName} ({mediaType.abbreviation})</option>;
}

export default function ConvertOptions({ onSet }) {
  const [options, optionsDispatcher] = useReducer((_, action) => {
    const newState = {
      ...convertOptionsSubject.value,
      ...action,
    };
    convertOptionsSubject.next(newState);
  }, convertOptionsSubject.value);

  const inputMediaType = useContext(InputMediaContext);
  if (!inputMediaType) {
    return null;
  }

  const [inputMediaNs, ] = inputMediaType.split('/');

  switch (inputMediaNs) {
    case 'video':
      return <VideoConvertOptions dispatcher={optionsDispatcher} />;
    // case 'audio':
    //   return <AudioConvertOptions />;
    // case 'image':
    //   return <ImageConvertOptions />;
    default:
      return null;
  }
}

function VideoConvertOptions({ dispatcher }) {
  return <>
    <div className="field">
      <div className="control">
        <div className="select">
          <select onChange={e => dispatcher({ format: e.target.value })}>
            <option value="uncompressed">Uncompressed</option>
            <optgroup label="Image">
              {Object.entries(MediaTypes.image).map(([, mediaType]) => mediaTypeToOptionElement(mediaType))}
            </optgroup>
            <optgroup label="Video">
              {Object.entries(MediaTypes.video).map(([, mediaType]) => mediaTypeToOptionElement(mediaType))}
            </optgroup>
            <optgroup label="Audio">
              {Object.entries(MediaTypes.audio).map(([, mediaType]) => mediaTypeToOptionElement(mediaType))}
            </optgroup>
          </select>
        </div>
      </div>
    </div>

    <div className="field">
      <label className="checkbox">
        <input type="checkbox" onChange={e => dispatcher({ reencodeVideo: e.target.checked })}/>
        Reencode Video
      </label>  
    </div>

    <div className="field">
      <label className="checkbox">
        <input type="checkbox" onChange={e => dispatcher({ reencodeAudio: e.target.checked })} />
        Reencode Audio
      </label>
    </div>
  </>;
}
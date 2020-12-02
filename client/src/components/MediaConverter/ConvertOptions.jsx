import React, { useState, useReducer, useContext } from 'react';
import MediaTypes, { MediaType, InputMediaContext } from './MediaTypes';
import { convertOptionsSubject } from './ConvertOptionsSubject';

/**
 * @param {MediaType} mediaType 
 */
function mediaTypeToOptionElement(key, mediaType) {
  return <option value={key}>{mediaType.fullName} ({mediaType.abbreviation})</option>;
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
    case 'audio':
      return <AudioConvertOptions />;
    case 'image':
      return <ImageConvertOptions />;
    default:
      return null;
  }
}

function VideoConvertOptions({ dispatcher }) {
  return <>
    <div className="field">
      <div className="control">
        <div className="select">
          <select onChange={e => dispatcher({ mediaType: MediaTypes[e.target.value] })}>
            <option value="uncompressed">Uncompressed</option> 
            <optgroup label="Image">
              {Object.entries(MediaTypes.image()).map(entry => mediaTypeToOptionElement(...entry))}
            </optgroup>
            <optgroup label="Video">
              {Object.entries(MediaTypes.video()).map(entry => mediaTypeToOptionElement(...entry))}
            </optgroup>
            <optgroup label="Audio">
              {Object.entries(MediaTypes.audio()).map(entry => mediaTypeToOptionElement(...entry))}
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

function AudioConvertOptions() {
  return <></>;
}

function ImageConvertOptions() {
  return <></>;
}
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
  const [options, optionsDispatcher] = useReducer((state, action) => {
    const newState = {
      ...state,
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
      return <VideoConvertOptions />

    case 'audio':
      return <></>;

    case 'image':
      return <ImageConvertOptions />
      
    default:
      return null;
  }
}

function VideoConvertOptions() {
  const [outputMediaNs, setOutputMediaNs] = useState('video');

  return <>
    <div className="field">
      <div className="select">
        <select defaultValue={outputMediaNs} onChange={e => setOutputMediaNs(e.target.value)}>
          <VideoOption />
          <AudioOption />
          <ImageOption />
        </select>
      </div>
    </div>

    {
      {
        'video': <OutputVideoFormats />,
        'audio': <OutputAudioFormats />,
        'image': <OutputImageFormats />
      }[outputMediaNs]
    }
  </>;
}

function AudioConvertOptions() {
  return <>
    <OutputAudioFormats />
  </>;
}

function ImageConvertOptions() {
  const [outputMediaNs, setOutputMediaNs] = useState('image');

  return <>
    <div className="field">
      <div className="select">
        <select defaultValue={outputMediaNs} onChange={e => setOutputMediaNs(e.target.value)}>
          <ImageOption />
          <VideoOption />
        </select>
      </div>
    </div>

    {
      {
        'video': <OutputVideoFormats />,
        'image': <OutputImageFormats />
      }[outputMediaNs]
    }
  </>;
}

function OutputVideoFormats() {
  return (
    <div className="field">
      <div className="select">
        <select>
          {Object.entries(MediaTypes.video()).map(([k, v]) => mediaTypeToOptionElement(k, v))}
        </select>
      </div>
    </div>
  )
}

function OutputAudioFormats() {
  return (
    <div className="field">
      <div className="select">
        <select>
          {Object.entries(MediaTypes.audio()).map(([k, v]) => mediaTypeToOptionElement(k, v))}
        </select>
      </div>
    </div>
  )
}

function OutputImageFormats() {
  return (
    <div className="field">
      <div className="select">
        <select>
          {Object.entries(MediaTypes.image()).map(([k, v]) => mediaTypeToOptionElement(k, v))}
        </select>
      </div>
    </div>
  )
}

const VideoOption = () => 
  <option value="video">Video</option>;

const AudioOption = () => 
  <option value="audio">Audio</option>;

const ImageOption = () => 
  <option value="image">Image</option>;

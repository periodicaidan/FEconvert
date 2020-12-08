import React, { useState, useReducer, useContext, createContext } from 'react';
import MediaTypes, { MediaType, InputMediaContext } from './MediaTypes';
import { convertOptionsSubject } from './ConvertOptionsSubject';

const OptionsDispatcherContext = createContext();

/**
 * @param {MediaType} mediaType 
 */
function mediaTypeToOptionElement(key, mediaType) {
  return <option value={key}>{mediaType.fullName} ({mediaType.abbreviation})</option>;
}

export default function ConvertOptions() {
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
      return (
        <OptionsDispatcherContext.Provider value={optionsDispatcher}>
          <VideoConvertOptions />
        </OptionsDispatcherContext.Provider>
      )

    case 'audio':
      return (
        <OptionsDispatcherContext.Provider value={optionsDispatcher}>
          <AudioConvertOptions />
        </OptionsDispatcherContext.Provider>
      );

    case 'image':
      return (
        <OptionsDispatcherContext.Provider value={optionsDispatcher}>
          <ImageConvertOptions />
        </OptionsDispatcherContext.Provider>
      )
      
    default:
      return null;
  }
}

function VideoConvertOptions() {
  const [outputMediaNs, setOutputMediaNs] = useState('video');
  const dispatcher = useContext(OptionsDispatcherContext);

  const handleSetOutputMediaNs = (e) => {
    setOutputMediaNs(e.target.value);
    switch (e.target.value) {
      case 'video':
        dispatcher({
          preserveVideoCodec: true,
          preserveAudioCodec: true,
          removeAudio: false,
          removeVideo: false,
          uncompressed: false
        });
        break;

      case 'audio':
        dispatcher({
          preserveAudioCodec: true,
          removeVideo: true,
          uncompressed: false,
        });
        break;
    }
  };

  return <>
    <div className="field">
      <div className="select">
        <select defaultValue={outputMediaNs} onChange={handleSetOutputMediaNs}>
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
  const dispatcher = useContext(OptionsDispatcherContext);
  dispatcher({ outputMediaType: MediaTypes.mp4 });

  return (
    <div className="field">
      <div className="select">
        <select defaultValue="mp4" onChange={e => dispatcher({ outputMediaType: MediaTypes[e.target.value] })}>
          {Object.entries(MediaTypes.video()).map(([k, v]) => mediaTypeToOptionElement(k, v))}
        </select>
      </div>
    </div>
  )
}

function OutputAudioFormats() {
  const dispatcher = useContext(OptionsDispatcherContext);
  dispatcher({ outputMediaType: MediaTypes.mp3 })
  return (
    <div className="field">
      <div className="select">
        <select defaultValue="mp3" onChange={e => dispatcher({ outputMediaType: MediaTypes[e.target.value] })}>
          {Object.entries(MediaTypes.audio()).map(([k, v]) => mediaTypeToOptionElement(k, v))}
        </select>
      </div>
    </div>
  )
}

function OutputImageFormats() {
  const dispatcher = useContext(OptionsDispatcherContext);
  dispatcher({ outputMediaType: MediaTypes.gif });
  return (
    <div className="field">
      <div className="select">
        <select defaultValue="gif" onChange={e => dispatcher({ outputMediaType: MediaTypes[e.target.value] })}>
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

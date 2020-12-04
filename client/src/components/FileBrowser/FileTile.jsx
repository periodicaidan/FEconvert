import React from 'react';

export default function FileTile({ fileName, mediaType }) {
  
  return (
    <div className="media is-flex is-align-items-center">
      <div className="media-left">
        <FileTypeIcon fileType={mediaType.mimeType[0]} />
      </div>
      <div className="media-content">
        <h1 className="title is-3">{fileName}</h1>
        <h2 className="subtitle is-4">{mediaType.fullName}</h2>
      </div>
      <div className="media-right">
        <button className="button is-danger">
          <div className="icon">
            <i className="fas fa-lg fa-trash-alt"></i>
          </div>
        </button>
      </div>
    </div>
  );
}

function FileTypeIcon({ fileType }) {
  const color = {
    video: 'blueviolet',
    audio: 'crimson',
    image: 'darkturquoise'
  }[fileType] ?? 'dimgrey';

  const iconName = {
    video: 'fa-file-video',
    audio: 'fa-file-audio',
    image: 'fa-file-image',
  }[fileType] ?? 'fa-file-alt';

  return (
    <span className="icon" style={{ color }}>
      <i className={`fas fa-3x ${iconName}`}></i>
    </span>
  );
}
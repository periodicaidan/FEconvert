import React, { useEffect, useState } from 'react';
import FileTile from './FileTile';
import MediaTypes from '../MediaConverter/MediaTypes';
import NicelySpaced from '../NicelySpaced';

const USER_MEDIA_ENDPOINT = '/api/user_media';

export default function FileBrowser() {
  // Fetch the user's file metadata
  let files;
  useEffect(() => {
    fetch(USER_MEDIA_ENDPOINT, {
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => {
        files = json;
        console.log(json);
      });
  }, []);

  return (
    <NicelySpaced width={8}>
      <div className="block">
        <InlineFileUploadForm />
      </div>
      <div className="card">
        <header className="card-header has-background-info">
          <h3 className="card-header-title title is-3 has-text-white">
            My Files
          </h3>
        </header>
        <div className="card-content">
          {files && files?.length > 0
            ? files.map(f => <FileTile fileName={f.mediaName} mediaType={MediaTypes[getLastEl(f.mediaName.split('.'))]} mediaLink={f.mediaLink} />)
            : "You have no files!"
          }
        </div>
      </div>
    </NicelySpaced>  
  );
}

function getLastEl(arr) {
  return arr[arr.length - 1]
}

function InlineFileUploadForm() {
  const [file, setFile] = useState();

  const handleFormSubmit = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('newMedia', file);

    fetch('/api/media_upload', {
      method: 'POST',
      body: formData
    })
      .then(console.log)
      .catch(console.error)
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="field has-addons">
        <div className="control">
          <div className="file has-name">
            <label className="file-label">
              <input type="file" className="file-input" onChange={e => setFile(e.target.files?.item(0))} />
              <span className="file-cta">
                <span className="file-label">
                  Upload...
                </span>
              </span>
            </label>
            <span className="file-name">
              {file?.name ?? 'No file selected'}
            </span>
          </div>
        </div>
        <div className="control">
          <button type="submit" class="button is-link" disabled={!file}>
            <i className="fas fa-plus"></i>
          </button>
        </div>
      </div>
    </form>
  )
}
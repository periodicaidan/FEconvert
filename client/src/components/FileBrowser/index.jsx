import React, { useEffect } from 'react';
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
      <div className="card">
        <header className="card-header has-background-info">
          <h3 className="card-header-title title is-3 has-text-white">
            My Files
          </h3>
        </header>
        <div className="card-content">
          <FileTile fileName="bruh_sound_effect_2.wav" mediaType={MediaTypes.wav} />
          <FileTile fileName="jimin_fancam_uwu.mkv" mediaType={MediaTypes.mkv} />
          <FileTile fileName="trump_WRONG.gif" mediaType={MediaTypes.gif} />
        </div>
      </div>
    </NicelySpaced>  
  );
}
import React from 'react';
import FileTile from './FileTile';
import MediaTypes, { MediaType } from '../MediaConverter/MediaTypes';
import NicelySpaced from '../NicelySpaced';

/**
 * @param {{files: {fileName: string, mediaType: MediaType}}[]} param0 
 */
export default function FileBrowser({ files }) {
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
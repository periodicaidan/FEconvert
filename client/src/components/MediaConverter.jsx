import React, { useRef, useEffect, useState } from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import Notification from './Notification';

const ffmpeg = createFFmpeg({ log: true });

/**
 * FFmpeg, like many WASM things, requires SharedArrayBuffer to work. Firefox only allows use of SAB if the origin 
 * has a valid TLS cert from a trusted CA. We'll have to remember to get a TLS cert for deployment!
 */
function notifyIfBrowserDoesNotSupportSharedArrayBuffer() {
  if (!window.SharedArrayBuffer) {
    return (
      <Notification type="danger">
        Your browser does not support SharedArrayBuffer! FEconvert will not work.
      </Notification>
    )
  }
}

/**
 * @param {File} inputFile 
 * @returns {Promise<string>}
 */
async function convertToGif(inputFile) {
  ffmpeg.FS('writeFile', inputFile.name, await fetchFile(inputFile));
  await ffmpeg.run('-i', inputFile.name, '-f', 'gif', 'out.gif');
  const data = ffmpeg.FS('readFile', 'out.gif');
  const url = URL.createObjectURL(new Blob([data.buffer], { type: 'image/gif' }));
  return url;
}

/**
 * @param {string} newExtension 
 * @param {string} fileName 
 * @returns {string}
 */
function replaceFileExtensionWith(newExtension, fileName) {
  const pieces = fileName.split('.');
  pieces.pop();
  pieces.push(newExtension);
  return pieces.join('.');
}

export default function MediaConverter(props) {
  const [ffmpegState, setFFmpegState] = useState({
    ready: ffmpeg.isLoaded(),
    working: false,
  });
  const [inputFile, setInputFile] = useState();
  const [outputFile, setOutputFile] = useState();

  useEffect(() => {
    if (!ffmpegState.ready) {
      ffmpeg.load()
        .then(() => setFFmpegState({ ...ffmpegState, ready: true }))
        .catch(console.error);      
    }
  }, []);

  const handleFileUpload = e => {
    const newFile = e.target.files?.item(0);
    if (newFile) {
      setInputFile(newFile);
      console.log(newFile);
    }
    console.log(ffmpegState)
  };

  const formReady = () => 
    ffmpegState.ready && inputFile != null;

  const convertUploadedFile = async (e) => {
    e.preventDefault();

    setFFmpegState({ ...ffmpegState, working: true });
    setOutputFile(await convertToGif(inputFile));
    setFFmpegState({ ...ffmpegState, working: false });
  }

  return (
    <div className="columns is-centered">
      <div className="column is-half">
        <div className="card">
          <div className="card-content">
            {notifyIfBrowserDoesNotSupportSharedArrayBuffer()}
            <form onSubmit={convertUploadedFile}>
              <div className="field">
                <div className="file has-name is-boxed is-fullwidth is-medium">
                  <label className="file-label">
                    <input type="file" name="inputFile" className="file-input" onChange={handleFileUpload} />
                    <span className="file-cta">
                      <span className="file-icon">
                        <i className="fas fa-upload"></i>
                      </span>
                      <span className="file-label has-text-centered">
                        Select a file...
                      </span>
                    </span>
                    <span className="file-name">
                      {inputFile?.name ?? 'No file selected'}
                    </span>
                  </label>
                </div>
              </div>

              <div className="field is-grouped is-grouped-centered">
                <div className="control">
                  <button className={`button is-large is-primary ${ffmpegState.working && 'is-loading'}`} disabled={!formReady()}>Convert</button>
                </div>
                {outputFile && 
                  <div className="control">
                    <a 
                      href={outputFile} 
                      role="button" 
                      download={replaceFileExtensionWith('gif', inputFile.name)} 
                      className="button is-large is-link"
                    >
                      Download!
                    </a>
                  </div>
                }
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
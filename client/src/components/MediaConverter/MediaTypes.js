import { createContext } from 'react';

export class MediaType {
  constructor(fullName, abbreviation, extension, mimeType) {
    this.fullName = fullName;
    this.abbreviation = abbreviation;
    this.extension = extension;
    this.mimeType = mimeType;
  }
}

export const InputMediaContext = createContext();

const video = {
  'mp4': new MediaType('MPEG-4', 'MP4', 'mp4', ['video', 'mp4']),
  'mkv': new MediaType('Matroska', 'MKV', 'mkv', ['video', 'x-matroska']),
  'webm': new MediaType('WebM', 'WebM', 'webm', ['video', 'webm'])
};

const audio = {
  'mp3': new MediaType('MPEG-3', 'MP3', 'mp3', ['audio', 'mp3']),
  'ogg': new MediaType('Ogg Vorbis', 'OGG', 'ogg', ['audio', 'ogg']),
  'wav': new MediaType('Waveform Audio', 'WAV', 'wav', ['audio', 'wave'])
};

const image = {
  'gif': new MediaType('Graphics Interchange Format', 'GIF', 'gif', ['image', 'gif']),
  'apng': new MediaType('Animated PNG', 'APNG', 'apng', ['image', 'apng']),
};

export default {
  ...video, 
  ...audio, 
  ...image,

  video: () => video,
  audio: () => audio,
  image: () => image,
};
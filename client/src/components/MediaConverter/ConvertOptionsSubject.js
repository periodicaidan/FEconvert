import { BehaviorSubject } from 'rxjs';

export const convertOptionsSubject = new BehaviorSubject({
  outputMediaType: undefined, 
  preserveAudioCodec: true, 
  preserveVideoCodec: true,
  removeAudio: false,
  removeVideo: false,
  startTime: undefined,
  duration: undefined,
  uncompressed: false
});


import { FFmpeg, createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import MediaTypes, { MediaType } from './MediaTypes';

export const ffmpeg = createFFmpeg({ log: true });

class Converter {
    constructor(ffmpeg) {
        this.ffmpeg = ffmpeg;
        this.files = [];
    }

    addFile(file) {
        this.files.push(file.name);
        this.ffmpeg.FS('writeFile', file.name, fetchFile(file));
    }

    cleanup() {
        this.ffmpeg.FS('unlink', ...this.files);
    }
}

const ffmpegFlags = {
    preserveAudioCodec: ['-c:a', 'copy'],
    preserveVideoCodec: ['-c:v', 'copy'],
    removeAudio: ['-an'],
    removeVideo: ['-vn'],
    startTime: (time) => ['-ss', `${time}`],
    duration: (time) => ['-t', `${time}`],
};

/**
 * @param {File} inputFile 
 * @param {any} param1
 * @returns {[ string, string ]}
 */
export async function convert(inputFile, { 
    outputMediaType, 
    preserveAudioCodec, 
    preserveVideoCodec,
    removeAudio,
    removeVideo,
    startTime,
    duration,
    uncompressed
}) {
    // Constructing the FFmpeg command
    const ffmpegCommand = [
        '-i', inputFile.name,               // input file
        '-f', outputMediaType.extension,    // target format
    ];

    preserveAudioCodec && ffmpegCommand.push(...ffmpegFlags.preserveAudioCodec);
    preserveVideoCodec && ffmpegCommand.push(...ffmpegFlags.preserveVideoCodec);
    removeAudio && ffmpegCommand.push(...ffmpegFlags.removeAudio);
    removeVideo && ffmpegCommand.push(...ffmpegFlags.removeVideo);
    startTime && ffmpegCommand.push(...ffmpegFlags.startTime(startTime));
    duration && ffmpegCommand.push(...ffmpegFlags.duration(duration));

    // Preparing for conversion
    const outputFileName = replaceExtension(inputFile.name, outputMediaType.extension);
    ffmpeg.FS('writeFile', inputFile.name, await fetchFile(inputFile));

    await ffmpeg.run(...ffmpegCommand, outputFileName);
    const outputFile = ffmpeg.FS('readFile', outputFileName);
    const outputFileUrl = URL.createObjectURL(new Blob(
        [outputFile.buffer], 
        { type: outputMediaType.mimeType.join('/') }
    ));
    ffmpeg.FS('unlink', inputFile.name, outputFileName);

    return [outputFileName, outputFileUrl];
}

function replaceExtension(fileName, newExt) {
    const fileParts = fileName.split('.');
    fileParts.pop();
    fileParts.push(newExt)
    return fileParts.join('.')
}

/**
 * Converting a video or moving image to individual frames requires some doing, mainly because we'll need
 * to create a folder in the WASM VFS to hold the frames in, then iterate over those frames and store them
 * in a zip archive.
 * 
 * @param {File} inputFile 
 */
async function videoOrImageToFrames(inputFile, {
    duration,
    startTime
}) {
    const outputDir = 'frames';
    const ffmpegCommand = [
        '-i', inputFile.name,
    ];

    duration && ffmpegCommand.push(...ffmpegFlags.duration(duration));
    startTime && ffmpegCommand.push(...ffmpegFlags.startTime(startTime));
    ffmpegCommand.push(`${outputDir}/frame_%d.png`);

    ffmpeg.FS('writeFile', inputFile.name, await fetchFile(inputFile));
    ffmpeg.FS('mkdir', outputDir);
    ffmpeg.run(...ffmpegCommand);

}

/**
 * Converting an image to a video is a lot of work because video encoding is much more complex than image
 * encoding. FFmpeg must be informed of things like the target colorspace and pixel format, as well as
 * do some math to make sure it creates a valid output resolution.
 * 
 * @param {File} inputFile 
 */
function imageToVideo(inputFile) {

}
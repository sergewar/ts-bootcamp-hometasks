import * as path from 'path';
import {
    getFilesByRegex,
    encodeFile,
    decodeFile,
    zipFiles,
    unzipArchive,
} from './file-operations';

export type EncodeParametersType = {
    excludeFilesByPattern: string,
    includeFilesByPattern: string,
    excludeFilesByExtension: string,
    includeFilesByExtension: string,
    directory: string,
    secretKey: string,
    overrideOriginals: boolean,
    archive: boolean,
    uploadToGDrive: boolean,
};

export type DecodeParametersType = {
    excludeFilesByPattern: string,
    includeFilesByPattern: string,
    excludeFilesByExtension: string,
    includeFilesByExtension: string,
    directory: string,
    secretKey: string,
};

export function encode(parameters: EncodeParametersType):void {
    // select files
    let pattern = '';
    if (parameters.includeFilesByExtension) {
        pattern = parameters.includeFilesByExtension;
    }

    const pat = pattern || '*.txt';
    const filesForEncode = getFilesByRegex(pat);
    // encrypt files
    const encodedFiles = filesForEncode.map((file) => encodeFile(file, parameters.secretKey));
    console.log(`Files\n${filesForEncode}\nwere encoded to files\n${encodedFiles}`);
    // archive files

    if (parameters.archive) {
        console.log(`Archive encoded files ${encodedFiles}`);
        const zipArchive = zipFiles(path.join(__dirname), encodedFiles);
        console.log(`Zip archive ${zipArchive}`);
        unzipArchive(zipArchive, parameters.directory);
    }
    // replace files
    if (parameters.overrideOriginals) {
        console.log(`Remove original files ${filesForEncode}`);
    }
    // upload to GDrive
}

export function decode(parameters: DecodeParametersType):void {
    // unarchive files if needed
    // select files
    const pattern = '';
    const pat = pattern || '*.enc';
    const filesForDecode = getFilesByRegex(pat);
    // decrypt files
    const decodedFiles = filesForDecode.forEach((file) => {
        decodeFile(file, parameters.secretKey);
    });

    console.log(`Files ${filesForDecode} were encoded to files ${decodedFiles}`);
}

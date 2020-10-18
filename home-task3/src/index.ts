import * as yargs from 'yargs';

import {
    encode, decode,
    EncodeParametersType,
    DecodeParametersType,
} from './text-protector';

type ActionType = 'encrypt' | 'decrypt';

const {
    excludeFilesByPattern,
    includeFilesByPattern,
    excludeFilesByExtension,
    includeFilesByExtension,
    directory,
    secretKey,
    overrideOriginals,
    archive,
    action,
    uploadToGDrive,
} = yargs
    .string('excludeFilesByPattern')
    .string('includeFilesByPattern')
    .string('excludeFilesByExtension')
    .string('includeFilesByExtension')
    .string('directory')
    .string('secretKey')
    .boolean('overrideOriginals')
    .boolean('archive')
    .string('action')
    .boolean('uploadToGDrive')
    .alias('excludeFilesByPattern', 'excludeFilesByPattern')
    .alias('includeFilesByPattern', 'includeFilesByPattern')
    .alias('excludeFilesByExtension', 'excludeFilesByExtension')
    .alias('includeFilesByExtension', 'includeFilesByExtension')
    .alias('directory', 'directory')
    .alias('secretKey', 'secretKey')
    .alias('overrideOriginals', 'overrideOriginals')
    .alias('archive', 'archive')
    .alias('action', 'action')
    .alias('uploadToGDrive', 'uploadToGDrive')
    .default('excludeFilesByPattern', '')
    .default('includeFilesByPattern', '**/*.*')
    .default('excludeFilesByExtension', '')
    .default('includeFilesByExtension', '')
    .default('directory', '')
    .default('overrideOriginals', false)
    .default('archive', true)
    .default('action', 'encrypt')
    .default('uploadToGDrive', false)
    .argv;

if (!secretKey) {
    throw new Error('Secret key not provided');
} else if (action as ActionType === 'encrypt') {
    const encodeParameters: EncodeParametersType = {
        excludeFilesByPattern,
        includeFilesByPattern,
        excludeFilesByExtension,
        includeFilesByExtension,
        directory,
        secretKey,
        overrideOriginals,
        archive,
        uploadToGDrive,
    };
    encode(encodeParameters);
} else if (action as ActionType === 'decrypt') {
    const decodeParameters:DecodeParametersType = {
        excludeFilesByPattern,
        includeFilesByPattern,
        excludeFilesByExtension,
        includeFilesByExtension,
        directory,
        secretKey,
    };
    decode(decodeParameters);
} else {
    throw new Error(`Incorrect action type: ${action} possible values are ....`);
}

import * as fs from 'fs';
import * as path from 'path';
import glob from 'glob';
import yazl from 'yazl';
import * as JSZip from 'jszip';
import { encode, decode } from './coder';

export function getFilesByRegex(regex: string): Array<string> {
    return glob.sync(regex, {});
}

// can't implement this can't win this async operations
export function zipFiles(archiveName: string, filesForArchive: Array<string>): string {
    const archiveNameZip = `${archiveName}.zip`;
    // can't win async operations
    // const zipfile = new yazl.ZipFile();
    // filesForArchive.forEach((file) => zipfile.addFile(file, file));
    // zipfile.outputStream
    //     .pipe(fs.createWriteStream(archiveNameZip))
    //     .on('close', () => {
    //         console.log('Files archived');
    //     });
    // zipfile.end();
    return archiveNameZip;
}

// can't implement this can't win this async operations
// eslint-disable-next-line max-len
export function unzipArchive(archiveFilePath: string, outputDirectory: string): void {
    // can't win async operations
    // fs.readFile(archiveFilePath, (err, data) => {
    //     if (!err) {
    //         JSZip.loadAsync(data).then((contents) => {
    //             Object.keys(contents.files).forEach((filename) => {
    //                 const zFile = JSZip.file(filename);
    //                 if (zFile) {
    //                     zFile.async('nodebuffer').then((content) => {
    //                         const dest = path + filename;
    //                         fs.writeFileSync(dest, content);
    //                     });
    //                 }
    //             });
    //         });
    //     }
    // });
}

export function encodeFile(fileName:string, cypher: string): string {
    const encodedFileName = `${fileName.toString()}.enc`;
    const readData = fs.readFileSync(fileName, { encoding: 'utf8' });
    const encodedData = encode(readData.toString(), cypher);
    fs.writeFileSync(encodedFileName, encodedData, { encoding: 'utf8' });
    return encodedFileName;
}

export function decodeFile(fileName:string, cypher: string): string {
    const decodedFileName = `${fileName.substring(0, fileName.length - '.enc'.length)}.dec`;
    fs.readFile(fileName, { encoding: 'utf8' }, (errRead, data) => {
        if (errRead) {
            console.log(`Can't read file ${fileName} `, errRead);
        } else {
            const decodedData = decode(data.toString(), cypher);
            fs.writeFileSync(decodedFileName, decodedData, { encoding: 'utf8' });
        }
    });
    return decodedFileName;
}

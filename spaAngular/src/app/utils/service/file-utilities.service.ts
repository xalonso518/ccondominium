import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';

@Injectable()
export class FileUtilitiesService {
    constructor() {

    }

    downLoadFile(url: string, name: string = '_parent') {
        if (name === 'new') {
            const win = window.open(url, url, 'width=200,height=100');
            setTimeout(() => {
                if (win != null) { win.close(); }
            }, 1000);
            // if (win != null) win.close();
        } else { const win = window.open(url, name); }
    }

    downLoadFileBasse64(fileBase64: string, name: string, ext: string) {
        const file = new Blob([this.convertDataURIToBinary(fileBase64)], { type: 'application/pdf' });
        FileSaver.saveAs(file, name + new Date().getTime() + '.' + ext);
    }

    getFileBasse64(fileBase64: string, ext: string): string {
        const file = new Blob([this.convertDataURIToBinary(fileBase64)], { type: 'application/' + ext });
        const fileURL = URL.createObjectURL(file);
        return fileURL;
    }

    convertDataURIToBinary(dataURI: string) {
        const raw = window.atob(dataURI);
        const rawLength = raw.length;
        const array = new Uint8Array(new ArrayBuffer(rawLength));

        for (let i = 0; i < rawLength; i++) {
            array[i] = raw.charCodeAt(i);
        }
        return array;
    }

}

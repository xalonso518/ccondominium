import { Injectable } from '@angular/core';

@Injectable()
export class BrowserInfoService {
    constructor() {

    }

    isMobile(): boolean {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            return true;
        } else { return false; }
    }

    isIOS(): boolean {
        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            return true;
        } else { return false; }
    }

    isAndroid(): boolean {
        if (/Android|BlackBerry/i.test(navigator.userAgent)) {
            return true;
        } else { return false; }
    }

    isBrowserChrome(): boolean {
        if (navigator.userAgent.indexOf('Chrome') !== -1) {
            return true;
        } else { return false; }
    }

    isBrowserSafari(): boolean {
        if (navigator.userAgent.indexOf('Safari') !== -1) {
            return true;
        } else { return false; }
    }

    isBrowserFirefox(): boolean {
        if (navigator.userAgent.indexOf('Firefox') !== -1) {
            return true;
        } else { return false; }
    }

    isBrowserMSIE(): boolean {
        if (navigator.userAgent.indexOf('MSIE') !== -1) {
            return true;
        } else { return false; }
    }

}

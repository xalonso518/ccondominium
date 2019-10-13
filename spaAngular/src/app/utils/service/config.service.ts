import { Injectable, isDevMode  } from '@angular/core';

@Injectable()
export class ConfigService {
    apiURI: string;

    constructor() {
        if (isDevMode()) { this.apiURI = 'http://localhost:3000'; } else { this.apiURI = 'http://localhost:3000'; }
    }

    getApiURI() {
        return this.apiURI;
    }
}

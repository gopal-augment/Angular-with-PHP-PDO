import { Injectable } from '@angular/core';

@Injectable()

export class GlobalConfig {
}
export const GlobalVariable = Object.freeze({
    BASE_API_URL: 'http://172.16.2.23/',
    PORT_NUMBER: '4200'
});
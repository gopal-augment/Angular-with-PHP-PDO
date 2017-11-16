import { Injectable } from '@angular/core';

@Injectable()
export class HeaderMenuService {
    visible: boolean;

    constructor() { this.visible = true; }

    hide() { this.visible = false; }

    show() { this.visible = true; }

}
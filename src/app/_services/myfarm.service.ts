import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, RequestMethod } from '@angular/http';
import { JwtService } from './jwt.service';
import 'rxjs/Rx';

import { User } from '../_models/user';

@Injectable()
export class MyfarmService {
    constructor(private http: Http,
                private jwtService: JwtService) { }

    getAllGalleryFiles() {
        return this.http.get('http://localhost/angular/angular1/_api/myfarm/getAllGalleryFiles', this.jwtService.jwt())
            .share()
            .map(
                (response: Response) => response.json()
            );
    }
    uploadSeedFile(formData: any) {
        return this.http.post('http://localhost/angular/angular1/_api/myfarm/uploadFiles', formData, this.jwtService.jwt())
            .share()
            .map((response: Response) => response.json());
    }
}
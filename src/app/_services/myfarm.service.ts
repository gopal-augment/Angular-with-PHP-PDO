import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, RequestMethod } from '@angular/http';
import { JwtService } from './jwt.service';
import { GlobalVariable } from '../GlobalConfig';
import 'rxjs/Rx';

import { User } from '../_models/user';

@Injectable()
export class MyfarmService {
    public baseApiUrl = GlobalVariable.BASE_API_URL;
    public baseFolderUrl = GlobalVariable.BASE_FOLDER_URL;
    constructor(private http: Http,
                private jwtService: JwtService) { }

    getAllGalleryFiles() {
        return this.http.get(this.baseApiUrl + this.baseFolderUrl + '_api/myfarm/getAllGalleryFiles', this.jwtService.jwt())
            .share()
            .map(
                (response: Response) => response.json()
            );
    }
    uploadSeedFile(formData: any) {
        return this.http.post(this.baseApiUrl + this.baseFolderUrl + '_api/myfarm/uploadFiles', formData, this.jwtService.jwt())
            .share()
            .map((response: Response) => response.json());
    }
}
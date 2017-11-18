import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, RequestMethod } from '@angular/http';
import { JwtService } from './jwt.service';
import { GlobalVariable } from '../GlobalConfig';
import 'rxjs/Rx';

import { User } from '../_models/user';

@Injectable()
export class MybioregionService {
    public baseApiUrl = GlobalVariable.BASE_API_URL;
    public baseFolderUrl = GlobalVariable.BASE_FOLDER_URL;
    constructor(private http: Http,
                private jwtService: JwtService) { }

    getAllBioRegion() {
        return this.http.get(this.baseApiUrl + this.baseFolderUrl + '_api/mybioregion/getAllBioRegion', this.jwtService.jwt())
            .share()
            .map(
                (response: Response) => response.json()
            );
    }
    saveMyBioRegion(formData: any) {
        return this.http.post(this.baseApiUrl + this.baseFolderUrl + '_api/mybioregion/saveMyBioRegion', formData, this.jwtService.jwt())
            .share()
            .map((response: Response) => response.json());
    }
}
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, RequestMethod } from '@angular/http';
import { JwtService } from './jwt.service';
import { GlobalVariable } from '../GlobalConfig';
import 'rxjs/Rx';

@Injectable()
export class MasterService {
    public baseApiUrl = GlobalVariable.BASE_API_URL;
    constructor(private http: Http,
                private jwtService: JwtService) { }

    getMenuList() {
        return this.http.get(this.baseApiUrl + 'angular/angular1/_api/master/getMenuList', this.jwtService.jwt())
            .share()
            .map(
                (response: Response) => response.json()
            );
    }

}
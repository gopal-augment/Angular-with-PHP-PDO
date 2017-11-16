import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, RequestMethod } from '@angular/http';
import { JwtService } from './jwt.service';
import 'rxjs/Rx';

@Injectable()
export class MasterService {
    constructor(private http: Http,
                private jwtService: JwtService) { }

    getMenuList() {
        return this.http.get('http://localhost/angular/angular1/_api/master/getMenuList', this.jwtService.jwt())
            .share()
            .map(
                (response: Response) => response.json()
            );
    }

}
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, RequestMethod } from '@angular/http';
import 'rxjs/Rx';

import { User } from '../_models/user';

@Injectable()
export class JwtService {
    constructor(private http: Http) { }
    // private helper methods

    public jwt() {
        // create authorization header with jwt token
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.accesstoken) {
            const headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.accesstoken });
            return new RequestOptions({ headers: headers, withCredentials: true});
        }else{
            const headers = new Headers({
                'Content-Type': 'application/json'});
            return new RequestOptions({  headers: headers, withCredentials: true}); //, method: RequestMethod.Post
        }
    }
}
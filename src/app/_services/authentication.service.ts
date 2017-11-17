import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }
    public isAuthenticate(allowedMenu): boolean {
        let isAuth = false;
        let user = JSON.parse(this.getUserToken());
        // Stored my allowed groups in a config file, comma separated string
        let allowedGroups = allowedMenu;
        let userGroups: any;
        if (user !== null && user !== undefined) {
            try {
                let userGroups: any = user.roles;
                if (userGroups !== undefined && userGroups !== null && userGroups.length > 0) {
                    try {
                        userGroups.forEach((e: any) => {
                            if (allowedGroups.indexOf(e) > -1 || userGroups === 'admin') {
                                isAuth = true;
                            }

                        });
                    } catch (e) {
                        if (allowedGroups.indexOf(userGroups) > -1 || userGroups === 'admin') {
                            isAuth = true;
                        }
                    }
                }
            } catch (e) {
                isAuth = false;
                console.log("outer catch  error");
            }
        }else{
            console.log("No user");
        }
        return isAuth;
    }

    public getUserToken(): any {
        return localStorage.getItem('currentUser');
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
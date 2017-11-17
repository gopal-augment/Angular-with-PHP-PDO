import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, RequestMethod } from '@angular/http';
import { JwtService } from './jwt.service';
import { GlobalVariable } from '../GlobalConfig';
import 'rxjs/Rx';

import { User } from '../_models/user';

@Injectable()
export class UserService {
    public baseApiUrl = GlobalVariable.BASE_API_URL;
    constructor(private http: Http,
                private jwtService: JwtService) { }

    login(username: string, password: string, userRole: string) {
        let userDetail = JSON.stringify({ username: username, password: password, userRole: userRole });
        return this.http.post(this.baseApiUrl + 'angular/angular1/_api/user/login', userDetail, this.jwtService.jwt())
            .share()
            .map((response: Response) => response.json());
    }

    create(user: User) {
        return this.http.post(this.baseApiUrl + 'angular/angular1/_api/user/adduser', user, this.jwtService.jwt())
            .share()
            .map(
            (response: Response) => response.json()
            );
    }

    checkSession(){
        return this.http.get(this.baseApiUrl + 'angular/angular1/_api/user/checksession', this.jwtService.jwt())
            .map((response: Response) => response.json());
    }

    logout() {
        return this.http.get(this.baseApiUrl + 'angular/angular1/_api/user/logout', this.jwtService.jwt())
            .share()
            .map((response: Response) => response.json());
    }

    checkEmailExist(getmailid: string) {
        let mailid = JSON.stringify({ mailid: getmailid });
        return this.http.post(this.baseApiUrl + 'angular/angular1/_api/user/checkEmailExist', mailid, this.jwtService.jwt())
            .share()
            .map(
                (response: Response) => response.json()
            );
    }

    /*******Add admin user******/

    getAdminUserList() {
        return this.http.get(this.baseApiUrl + 'angular/angular1/_api/user/getAdminUserList', this.jwtService.jwt())
            .share()
            .map(
                (response: Response) => response.json()
            );
    }
    addAdminUsers(user: User) {
        return this.http.post(this.baseApiUrl + 'angular/angular1/_api/user/addAdminUsers', user, this.jwtService.jwt())
            .share()
            .map(
                (response: Response) => response.json()
            );
    }
    checkUserEmailExist(getmailid: string, getEditUserId: String) {
        let mailid = JSON.stringify({ mailid: getmailid, editUserId: getEditUserId });
        return this.http.post(this.baseApiUrl + 'angular/angular1/_api/user/checkUserEmailExist', mailid, this.jwtService.jwt())
            .share()
            .map(
                (response: Response) => response.json()
            );
    }
    getAdminUserDetail(getUserID: String) {
        let userID = JSON.stringify({ userID: getUserID });
        return this.http.post(this.baseApiUrl + 'angular/angular1/_api/user/getAdminUserDetail', userID, this.jwtService.jwt())
            .share()
            .map(
                (response: Response) => response.json()
            );
    }
    viewAdminUserDetail(getUserID: String) {
        let userID = JSON.stringify({ userID: getUserID });
        return this.http.post(this.baseApiUrl + 'angular/angular1/_api/user/getAdminUserDetail', userID, this.jwtService.jwt())
            .share()
            .map(
                (response: Response) => response.json()
            );
    }
    deleteAdminUserDetail(getUserID: String) {
        let userID = JSON.stringify({ userID: getUserID });
        return this.http.post(this.baseApiUrl + 'angular/angular1/_api/user/deleteAdminUserDetail', userID, this.jwtService.jwt())
            .share()
            .map(
                (response: Response) => response.json()
            );
    }
    /***USER ROLE***/
    getAdminUserRoleList() {
        return this.http.get(this.baseApiUrl + 'angular/angular1/_api/user/getAdminUserRoleList', this.jwtService.jwt())
            .share()
            .map(
                (response: Response) => response.json()
            );
    }
    addAdminUserRole(userRoles: String) {
        return this.http.post(this.baseApiUrl + 'angular/angular1/_api/user/addAdminUserRole', userRoles, this.jwtService.jwt())
            .share()
            .map(
                (response: Response) => response.json()
            );
    }
    getAdminUserRoleDetail(getRoleId: String) {
        let roleId = JSON.stringify({ roleId: getRoleId });
        return this.http.post(this.baseApiUrl + 'angular/angular1/_api/user/getAdminUserRoleDetail', roleId, this.jwtService.jwt())
            .share()
            .map(
                (response: Response) => response.json()
            );
    }
    viewAdminUserRoleDetail(getRoleId: String) {
        let roleId = JSON.stringify({ roleId: getRoleId });
        return this.http.post(this.baseApiUrl + 'angular/angular1/_api/user/getAdminUserRoleDetail', roleId, this.jwtService.jwt())
            .share()
            .map(
                (response: Response) => response.json()
            );
    }
    deleteAdminUserRoleDetail(getRoleId: String) {
        let roleId = JSON.stringify({ roleId: getRoleId });
        return this.http.post(this.baseApiUrl + 'angular/angular1/_api/user/deleteAdminUserRoleDetail', roleId, this.jwtService.jwt())
            .share()
            .map(
                (response: Response) => response.json()
            );
    }

    /*****Below code for reference******/

    update(user: User) {
        return this.http.put('/api/users/' + user.id, user, this.jwtService.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('/api/users/' + id, this.jwtService.jwt()).map((response: Response) => response.json());
    }
}
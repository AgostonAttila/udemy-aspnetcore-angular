import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import Auth0Lock from 'auth0-lock';



//auth0 = new auth0.WebAuth({
//    clientID: 'dYqL4RHAuAnZ5o6oTQFV6OQyRtLjupis',
//    domain: 'atesz014.eu.auth0.com',
//    responseType: 'token id_token',
//    audience: 'https://atesz014.eu.auth0.com/userinfo',
//    redirectUri: 'http://localhost:3000/callback',
//    scope: 'openid'
//});

@Injectable()
export class AuthService {
    profile: any;
    private roles: string[] = [];
    lock = new Auth0Lock('dYqL4RHAuAnZ5o6oTQFV6OQyRtLjupis', 'atesz014.eu.auth0.com', {});



    constructor() {
        this.readUserFromLocalStorage();
        this.lock.on('authenticated', (authResult: any) => this.onUserAuthenticated(authResult));
    }

    private onUserAuthenticated(authResult: any) {
        localStorage.setItem('token', authResult.accesToken);

        this.lock.getUserInfo(authResult.accesToken, (error, profile) => {
            if (error)
                throw error;

            localStorage.setItem('profile', JSON.stringify(profile));
            this.readUserFromLocalStorage();
        });
    }


    private readUserFromLocalStorage() {

        this.profile = JSON.parse(localStorage.getItem('profile') || '');

        var token = localStorage.getItem('token');
        if (token) {
            var jwtHelper: any = new jwtHelper();
            var decodedToken = jwtHelper.decodeToken(token);
            this.roles = decodedToken['https://vega.com/roles'] || [] ;
        }
    }

    public isInRole(roleName: any) {
        return this.roles.indexOf(roleName) > -1;
    }

    public login() {
        this.lock.show();
    }

    public authenticated() {
        return tokenNotExpired('token');
    }

    public logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('profile');
        this.profile = null;
        this.roles = [];
    }

}
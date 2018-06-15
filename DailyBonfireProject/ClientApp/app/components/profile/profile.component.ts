import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html'
})
export class ProfileComponent {
    public user: user;

    constructor(http: Http, @Inject('API_URL') apiUrl: string) {

        this.user = {} as user;

        http.get(apiUrl + '/api/User/7').subscribe(result => {
            this.user = result.json() as user;
        }, error => console.error(error));
    }

}

interface user {
    Name: string;
    Bio: string;
    JoinDate: Date;
}
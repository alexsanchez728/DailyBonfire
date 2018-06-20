import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html'
})
export class ProfileComponent {
    public user: User;

    constructor(http: Http, @Inject('API_URL') apiUrl: string) {

        this.user = {} as User;

        http.get(apiUrl + '/api/User/7').subscribe(result => {
            this.user = result.json() as User;
        }, error => console.error(error));
    }

}

interface User {
    name: string;
    bio: string;
    joinDate: Date;
}
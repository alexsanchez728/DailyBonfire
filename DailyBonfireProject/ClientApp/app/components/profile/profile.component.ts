import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html'
})
export class ProfileComponent {
    public user: User;
    public currentUser: number;

    constructor(http: Http, @Inject('API_URL') apiUrl: string, @Inject('currentUser') currentUser: number) {

        this.user = {} as User;
        this.currentUser = currentUser;

        http.get(apiUrl + '/api/User/' + this.currentUser).subscribe(result => {
            this.user = result.json() as User;
        }, error => console.error(error));
    }

}

interface User {
    name: string;
    bio: string;
    joinDate: Date;
}
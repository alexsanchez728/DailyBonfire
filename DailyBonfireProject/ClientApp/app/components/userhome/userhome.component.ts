import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'userhome',
    templateUrl: './userhome.component.html'
})
export class UserHomeComponent {
    public content: Content[];
    public userName: string;
    public selection: number;
    public editable: boolean;

    public currentUser: number;

    constructor(http: Http, route: ActivatedRoute, @Inject('API_URL') apiUrl: string, @Inject('currentUser') currentUser: number) {
        this.content = [] as Content[];

        this.currentUser = currentUser;
        this.selection = Number(route.snapshot.paramMap.get('id'));

        http.get(apiUrl + '/api/user/' + this.selection).subscribe(res => {
            this.userName = res.json().name;
        });

        http.get(apiUrl + '/api/UserContent/see/' + this.currentUser + '/' + this.selection).subscribe(result => {
            this.content = result.json() as Content[];

            return this.currentUser == this.selection ? this.editable = true : this.editable = false;

        }, error => console.error(error));
    }
}

interface Content {
    userId: number,
    contentId: number,
    userBoardId: number,
    contentTitle: string,
    boardTitle: string,
    url: string,
    userDescription: string,
    websiteDescription: string,
    isPublic: boolean;
}
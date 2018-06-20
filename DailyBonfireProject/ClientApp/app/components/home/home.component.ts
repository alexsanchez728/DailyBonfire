import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    public content: ContentDisplayable[];
    public http: Http;
    public url: string;
    public userResult: any;

    public currentUser = 7;

    constructor(http: Http, @Inject('API_URL') apiUrl: string) {

        this.http = http;
        this.url = apiUrl;
        this.userResult = {} as any;

        http.get(apiUrl + '/api/UserContent/' + this.currentUser).subscribe(result => {
            this.content = result.json() as ContentDisplayable[];

            for (let item of this.content) {
                this.http.get(this.url + '/api/User/' + item.userId).subscribe(result => {
                    this.userResult = result.json();

                    if (item.userId != this.userResult.id) {
                        item.userName = 'No User Available';
                    } else {
                        item.userName = this.userResult.name;
                    }

                    if (item.userId === this.currentUser) {
                        item.editable = true;
                    } else {
                        item.editable = false;
                    }

                }, error => console.error(error));
            }
        }, error => console.error(error));
    }


    public open(selectedContent: any) {
        this.open(selectedContent);
    }
}

interface ContentDisplayable {
    userId: number,
    contentId: number,
    userBoardId: number,
    userName: string,
    boardTitle: string,
    contentTitle: string,
    url: string,
    userDescription: string,
    websiteDescription: string,
    isPublic: boolean,
    boardName: string,
    editable: boolean,
}
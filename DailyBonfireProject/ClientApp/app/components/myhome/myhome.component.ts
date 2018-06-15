import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'myhome',
    templateUrl: './myhome.component.html'
})
export class MyHomeComponent {
    public content: content[];

    public currentUser = 7

    constructor(http: Http, @Inject('API_URL') apiUrl: string) {
        http.get(apiUrl + '/api/UserContent/see/' + this.currentUser + '/' + this.currentUser).subscribe(result => {
            this.content = result.json() as content[];
        }, error => console.error(error));
    }
}

interface content {
    userId: number,
    contentId: number,
    userBoardId: number,
    title: string,
    url: string,
    userDescription: string,
    websiteDescription: string,
    isPublic: boolean;
}
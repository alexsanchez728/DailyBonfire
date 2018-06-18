import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'my-home-boards',
    templateUrl: './myhomeboards.component.html',
})
export class MyHomeBoardsComponent {
    public boards: boards[];
    currentUser = 7;

    constructor(http: Http, @Inject('API_URL') apiUrl: string) {
        http.get(apiUrl + '/api/UserBoards/' + this.currentUser + '/' + this.currentUser).subscribe(result => {
            this.boards = result.json() as boards[];
        }, error => console.error(error));
    }
}

interface boards {
    id: number,
    boardId: number,
    title: string,
    descriptionFromUser: string,
    isPublic: boolean,
}
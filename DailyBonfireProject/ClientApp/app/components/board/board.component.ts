import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.css']
})
export class BoardComponent {
    public board: board;
    public content: content[];
    private selection: number | null

    constructor(route: ActivatedRoute, http: Http, @Inject('API_URL') apiUrl: string) {

        this.board = {} as board;
        this.selection = Number(route.snapshot.paramMap.get('id'));

        http.get(apiUrl + '/api/UserBoards/' + this.selection).subscribe(result => {
            this.board = result.json() as board;

            http.get(apiUrl + '/api/UserContent/board/' + this.board.boardId).subscribe(result => {
                this.content = result.json() as content[];
            }, error => console.error(error));
        }, error => console.error(error));
    }
}

interface board {
    boardId: number,
    userName: string,
    userId: number,
    title: string,
    descriptionFromUser: string,
    isPublic: boolean,
}

interface content {
    contentId: number,
    title: string,
    url: string,
    descriptionFromUser: string,
    webstieDescription: string,
    isPublic: boolean,
}
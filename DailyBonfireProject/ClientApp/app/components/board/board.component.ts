import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.css']
})
export class BoardComponent {
    public userBoard: board;
    public content: contentDisplayDto[];
    public currentUser: number;
    private selection: number | null

    constructor(route: ActivatedRoute, http: Http, @Inject('API_URL') apiUrl: string) {

        this.userBoard = {} as board;
        this.selection = Number(route.snapshot.paramMap.get('id'));
        this.currentUser = 7;

        http.get(apiUrl + '/api/UserBoards/' + this.selection).subscribe(result => {
            this.userBoard = result.json() as board;

            http.get(apiUrl + '/api/UserContent/board/' + this.userBoard.boardId + '/' + this.currentUser).subscribe(result => {
                this.content = result.json() as contentDisplayDto[];
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

interface contentDisplayDto {
    userId: number,
    contentId: number,
    contentTitle: string,
    boardId: number,
    boardTitle: number,
    url: string,
    descriptionFromUser: string,
    webstieDescription: string,
    isPublic: boolean,
}
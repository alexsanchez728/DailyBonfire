import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.css']
})
export class BoardComponent {
    public userBoard: Board;
    public content: ContentDisplayDto[];
    public currentUser: number;
    private selection: number;
    public editable: boolean;

    constructor(route: ActivatedRoute, http: Http, @Inject('API_URL') apiUrl: string, @Inject('currentUser') currentUser: number) {

        this.userBoard = {} as Board;
        this.selection = Number(route.snapshot.paramMap.get('id'));
        this.currentUser = currentUser;

        http.get(apiUrl + '/api/UserBoards/' + this.selection).subscribe(result => {
            this.userBoard = result.json() as Board;

            http.get(apiUrl + '/api/UserContent/board/' + this.userBoard.boardId + '/' + this.currentUser).subscribe(result => {
                this.content = result.json() as ContentDisplayDto[];

                return this.currentUser == this.selection ? this.editable = true : this.editable = false;

            }, error => console.error(error));
        }, error => console.error(error));
    }
}

interface Board {
    boardId: number,
    userName: string,
    userId: number,
    title: string,
    descriptionFromUser: string,
    isPublic: boolean,
}

interface ContentDisplayDto {
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
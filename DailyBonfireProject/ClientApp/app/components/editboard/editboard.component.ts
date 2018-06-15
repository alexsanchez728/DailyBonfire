import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'editboard',
    templateUrl: './editboard.component.html',
})
export class EditBoardComponent {
    public board: boarddisplayable;
    private selection: number | null;
    private userboardtoput: userboard;
    private boardtoput: BoardsDto;
    private currentuser = 7;

    private http: Http;
    private url: string;
    private checkboxvalue: boolean;

    constructor(route: ActivatedRoute, http: Http, @Inject('API_URL') apiUrl: string) {

        this.http = http;
        this.url = apiUrl;

        this.boardtoput = {} as BoardsDto;
        this.userboardtoput = {} as userboard;
        this.board = {} as boarddisplayable;

        this.selection = Number(route.snapshot.paramMap.get('id'));
        http.get(apiUrl + '/api/UserBoards/' + this.selection).subscribe(result => {
            this.board = result.json() as boarddisplayable;

            console.log(this.board);
        }, error => console.error(error));
    }


    change(event: any) {
        console.log(event);
        this.userboardtoput.IsPublic = event;
    }


    onClickSubmit(data: any) {
        this.userboardtoput = {} as userboard;
        this.userboardtoput.userId = this.currentuser;
        this.userboardtoput.BoardId = this.board.boardId;

        this.boardtoput.Title = data.title;
        this.boardtoput.DescriptionFromUser = data.descriptionFromUser;

        this.http.put(this.url + '/api/UserBoards/' + this.selection, this.userboardtoput).subscribe(result => { }, error => console.error(error));

        this.http.put(this.url + '/api/boards/' + this.userboardtoput.BoardId, this.boardtoput).subscribe(result => { }, error => console.error(error));
    }

    deleteBoard(boardId: number) {
        if (this.board.userId)
        this.http.delete(this.url + '/api/UserBoards/' + boardId).subscribe(result => { }, error => console.error(error));
    }

}
interface userboard {
    userId: number,
    BoardId: number,
    IsPublic: boolean,
}

interface boarddisplayable {
    boardId: number,
    userName: string,
    userId: number,
    title: string,
    descriptionFromUser: string,
    isPublic: boolean,
}

interface BoardsDto {
    Title: string,
    DescriptionFromUser: string,
}
import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'editboard',
    templateUrl: './editboard.component.html',
})
export class EditBoardComponent {
    public board: boarddisplayable;
    private selection: number | null;
    private userboardtoput: userboard;
    private boardtoput: BoardsDto;
    private currentuser: number;

    private http: Http;
    private router: any;
    private url: string;
    private checkboxvalue: boolean;

    constructor(router: Router, route: ActivatedRoute, http: Http, @Inject('API_URL') apiUrl: string) {
        
        this.http = http;
        this.url = apiUrl;
        this.router = router;
        this.currentuser = 7;

        this.boardtoput = {} as BoardsDto;
        this.userboardtoput = {} as userboard;
        this.board = {} as boarddisplayable;

        this.selection = Number(route.snapshot.paramMap.get('id'));
        http.get(apiUrl + '/api/UserBoards/' + this.selection).subscribe(result => {
            this.board = result.json() as boarddisplayable;

        }, error => console.error(error));
    }


    change(event: any) {
        this.userboardtoput.isPublic = event;
    }

    back() {
        this.router.navigateByUrl('my-home-boards');
    }

    onClickSubmit(data: any) {

        this.userboardtoput.userId = this.currentuser;
        this.userboardtoput.boardId = this.board.boardId;
        this.userboardtoput.id = this.board.id;

        this.boardtoput.title = data.title;
        this.boardtoput.descriptionFromUser = data.descriptionFromUser;
        this.boardtoput.id = this.userboardtoput.boardId;

        this.http.put(this.url + '/api/UserBoards/' + this.selection, this.userboardtoput).subscribe(result => {

            this.http.put(this.url + '/api/boards/' + this.userboardtoput.boardId, this.boardtoput).subscribe(result => { }, error => console.error(error));

            this.back();
        }, error => console.error(error));


    }

    deleteBoard(boardId: number) {
        if (this.board.userId)
            this.http.delete(this.url + '/api/UserBoards/' + boardId).subscribe(result => {
                this.back();
            }, error => console.error(error));
    }

}
interface userboard {
    id: number,
    userId: number,
    boardId: number,
    isPublic: boolean,
}

interface boarddisplayable {
    id: number,
    boardId: number,
    userName: string,
    userId: number,
    title: string,
    descriptionFromUser: string,
    isPublic: boolean,
}

interface BoardsDto {
    id: number
    title: string,
    descriptionFromUser: string,
}
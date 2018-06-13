import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'editboard',
    templateUrl: './editboard.component.html',
})
export class EditBoardComponent {
    public board: board;
    private selection: number | null

    constructor(route: ActivatedRoute, http: Http, @Inject('API_URL') apiUrl: string) {

        this.selection = Number(route.snapshot.paramMap.get('id'));
        this.board = {} as board;
        http.get(apiUrl + '/api/UserBoards/' + this.selection).subscribe(result => {
            this.board = result.json() as board;

            console.log(this.board);
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

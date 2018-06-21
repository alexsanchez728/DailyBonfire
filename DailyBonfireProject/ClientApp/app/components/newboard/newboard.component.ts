import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'newboard',
    templateUrl: './newboard.component.html'
})
export class NewBoardComponent {
    public boardToPost: BoardsDto;
    public newUserBoard: UserBoardsDto;
    public user: User;
    private router: Router;
    private currentUser: number;

    private http: Http;
    private url: string;

    private newboardresult: any;

    constructor(router: Router, http: Http, @Inject('API_URL') apiUrl: string, @Inject('currentUser') currentUser: number) {

        this.boardToPost = {} as BoardsDto;
        this.newUserBoard = {} as UserBoardsDto;
        this.user = {} as User;

        this.currentUser = currentUser;
        this.router = router;
        this.http = http;
        this.url = apiUrl;

        http.get(apiUrl + '/api/User/' + this.currentUser).subscribe(result => {
            this.user = result.json() as User;
        }, error => console.error(error));
    }

    back() {
        this.router.navigateByUrl('userhomeboards/' + this.currentUser);
    }

    onClickSubmit(data: any) {

        this.boardToPost.Title = data.title;
        this.boardToPost.DescriptionFromUser = data.descriptionFromUser;
        this.http.post(this.url + '/api/Boards', this.boardToPost ).subscribe(res => {
            this.newboardresult = res.json()

            this.newUserBoard.userId = this.user.id;
            this.newUserBoard.boardId = this.newboardresult.id;

            this.http.post(this.url + '/api/UserBoards', this.newUserBoard).subscribe(res => {
                this.back();
            });
        });

    }

    change(event: any) {
        this.newUserBoard.isPublic = event;
    }


}

interface UserBoardsDto {
    userId: number,
    boardId: number,
    isPublic: boolean,
}

interface BoardsDto {
    id: number,
    Title: string,
    DescriptionFromUser: string,
}

interface User {
    id: number,
    name: string,
    bio: string,
    joinDate: Date,
}
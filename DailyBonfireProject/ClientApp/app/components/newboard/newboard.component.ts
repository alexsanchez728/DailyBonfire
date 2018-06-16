import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'newboard',
    templateUrl: './newboard.component.html'
})
export class NewBoardComponent {
    public boardtopost: BoardsDto;
    public newuserboard: UserBoardsDto;
    public user: user;
    private router: any

    private http: Http;
    private url: string;

    private newboardresult: any;

    constructor(router: Router, http: Http, @Inject('API_URL') apiUrl: string) {

        this.boardtopost = {} as BoardsDto;
        this.newuserboard = {} as UserBoardsDto;

        this.router = Router;
        this.user = {} as user;
        this.http = http;
        this.url = apiUrl;

        http.get(apiUrl + '/api/User/7').subscribe(result => {
            this.user = result.json() as user;
        }, error => console.error(error));
    }

    back() {
        this.router.navigateByUrl('my-home-boards');
    }

    onClickSubmit(data: any) {

        this.boardtopost.Title = data.title;
        this.boardtopost.DescriptionFromUser = data.descriptionFromUser;
        this.http.post(this.url + '/api/Boards', this.boardtopost ).subscribe(res => {
            this.newboardresult = res.json()

            this.newuserboard.userId = this.user.id;
            this.newuserboard.boardId = this.newboardresult.id;

            this.http.post(this.url + '/api/UserBoards', this.newuserboard).subscribe(res => {
                this.back();
            });
        });

    }

    change(event: any) {
        this.newuserboard.isPublic = event;
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

interface user {
    id: number,
    name: string,
    bio: string,
    joinDate: Date,
}
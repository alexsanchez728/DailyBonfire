import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'newboard',
    templateUrl: './newboard.component.html'
})
export class NewBoardComponent {
    public boardtopost: BoardsDto;
    public newuserboard: UserBoardsDto;
    public user: user;

    private http: Http;
    private url: string;

    private newboardresult: any;

    constructor(http: Http, @Inject('API_URL') apiUrl: string) {

        this.boardtopost = {} as BoardsDto;
        this.newuserboard = {} as UserBoardsDto;

        this.user = {} as user;
        this.http = http;
        this.url = apiUrl;

        http.get(apiUrl + '/api/User/7').subscribe(result => {
            this.user = result.json() as user;
        }, error => console.error(error));
    }

    onClickSubmit(data: any) {

        this.boardtopost.Title = data.title;
        this.boardtopost.DescriptionFromUser = data.descriptionFromUser;
        console.log(this.url + '/Content');
        this.http.post(this.url + '/api/Boards', this.boardtopost ).subscribe(res => {
            this.newboardresult = res.json()

            this.newuserboard.isPublic = data.isPublic;
            this.newuserboard.userId = this.user.id;
            this.newuserboard.boardId = this.newboardresult.id;

            this.http.post(this.url + '/api/UserBoards', this.newuserboard).subscribe(res => {});


        });

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
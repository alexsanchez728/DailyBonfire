import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'newcontent',
    templateUrl: './newcontent.component.html'
})
export class NewContentComponent {
    public boards: boards[];
    public contenttopost: contenttopost;
    public usercontenttopost: usercontent;
    public newcontentresult: contentDto;
    public currentuser = 7;
    private router: any;

    public http: Http;
    public url: string;

    private newuserboardresult: userBoardDto;

    constructor(router: Router, http: Http, @Inject('API_URL') apiUrl: string) {

        this.contenttopost = {} as contenttopost;
        this.usercontenttopost = {} as usercontent;
        this.boards = {} as boards[];
        this.newuserboardresult = {} as userBoardDto;
        this.router = router;

        this.http = http;
        this.url = apiUrl;

        http.get(apiUrl + '/api/UserBoards/' + this.currentuser + '/' + this.currentuser).subscribe(result => {
            this.boards = result.json() as boards[];
        }, error => console.error(error));

    }

    back() {
        this.router.navigateByUrl('home');
    }

    change(event: any) {
        this.usercontenttopost.isPublic = event;
    }

    getBoardChoice(event: any) {
        console.log(event.value);
    }

    onClickSubmit(data: any) {

        this.contenttopost.title = data.title;
        this.contenttopost.url = 'http://' + data.url;
        console.log(this.url + '/api/UserBoards/By/' + this.currentuser + '/' + data.boardId);


        this.http.get(this.url + '/api/UserBoards/By/' + this.currentuser + '/' + data.boardId).subscribe(result => {
            this.newuserboardresult = result.json();

            this.http.post(this.url + '/api/Content', this.contenttopost).subscribe(res => {
                this.newcontentresult = res.json()


                this.usercontenttopost.userId = 7;
                this.usercontenttopost.contentId = this.newcontentresult.id;
                this.usercontenttopost.userBoardId = this.newuserboardresult.boardId;
                this.usercontenttopost.userDescription = data.userDescription;
                this.usercontenttopost.isPublic = data.isPublic;

                this.http.post(this.url + '/api/UserContent', this.usercontenttopost).subscribe(res => { });

        }, error => console.error(error));

            this.back();
        }, error => console.error(error));

    }
}

interface boards {
    id: number,
    boardId: number,
    title: string,
    descriptionFromUser: string,
    isPublic: boolean,
    userName: string,
}

interface userBoardDto {
    id: number,
    userId: number,
    boardId: number,
    isPublic: boolean,
}

interface contenttopost {
    title: string,
    url: string,
}

interface contentDto {
    id: number,
    title: string,
    url: string,
}

interface usercontent {
    userId: number,
    contentId: number,
    userBoardId: number,
    userDescription: string,
    isPublic: boolean,
}
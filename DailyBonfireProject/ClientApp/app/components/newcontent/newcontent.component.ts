import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'newcontent',
    templateUrl: './newcontent.component.html'
})
export class NewContentComponent {
    public userBoardOptions: Boards[];
    public contentToPost: ContentToPost;
    public userContentToPost: UserContent;
    public newContentResult: ContentDto;
    public currentUser = 7;
    private router: any;

    public http: Http;
    public url: string;

    private newuserboardresult: userBoardDto;

    constructor(router: Router, http: Http, @Inject('API_URL') apiUrl: string) {

        this.contentToPost = {} as ContentToPost;
        this.userContentToPost = {} as UserContent;
        this.userBoardOptions = [] as Boards[];
        this.newuserboardresult = {} as userBoardDto;
        this.router = router;

        this.http = http;
        this.url = apiUrl;

        http.get(apiUrl + '/api/UserBoards/' + this.currentUser + '/' + this.currentUser).subscribe(result => {
            this.userBoardOptions = result.json() as Boards[];
        }, error => console.error(error));

    }

    back() {
        this.router.navigateByUrl('home');
    }

    change(event: any) {
        this.userContentToPost.isPublic = event;
    }

    onClickSubmit(data: any) {

        this.contentToPost.title = data.title;
        this.contentToPost.url = 'http://' + data.url;

        this.http.get(this.url + '/api/UserBoards/By/' + this.currentUser + '/' + data.boardId).subscribe(result => {
            this.newuserboardresult = result.json();

            this.http.post(this.url + '/api/Content', this.contentToPost).subscribe(res => {
                this.newContentResult = res.json()


                this.userContentToPost.userId = 7;
                this.userContentToPost.contentId = this.newContentResult.id;
                this.userContentToPost.userBoardId = data.boardId;
                this.userContentToPost.userDescription = data.userDescription;

                this.http.post(this.url + '/api/UserContent', this.userContentToPost).subscribe(res => { });

        }, error => console.error(error));

            this.back();
        }, error => console.error(error));

    }
}

interface Boards {
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

interface ContentToPost {
    title: string,
    url: string,
}

interface ContentDto {
    id: number,
    title: string,
    url: string,
}

interface UserContent {
    userId: number,
    contentId: number,
    userBoardId: number,
    userDescription: string,
    isPublic: boolean,
}
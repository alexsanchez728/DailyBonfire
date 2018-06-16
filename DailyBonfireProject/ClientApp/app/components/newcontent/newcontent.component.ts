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
    public currentuser = 7;
    private router: any;

    public http: Http;
    public url: string;

    private newcontentresult: contentDto;
    private newuserboardresult: any;

    constructor(router: Router, http: Http, @Inject('API_URL') apiUrl: string) {

        this.contenttopost = {} as contenttopost;
        this.usercontenttopost = {} as usercontent;
        this.router = router;

        this.http = http;
        this.url = apiUrl;

        http.get(apiUrl + '/api/UserBoards/' + this.currentuser + '/7').subscribe(result => {
            this.boards = result.json() as boards[];
        }, error => console.error(error));

    }

    back() {
        this.router.navigateByUrl('home');
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
    boardId: number,
    title: string,
    descriptionFromUser: string,
    isPublic: boolean,
    userName: string,
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


// get boards where userId = 7
//*ngFor board in boards display boards.title
// with a value of boards.boardId

// when the user hits 'submit'
// POST to content
// POST to UserContent

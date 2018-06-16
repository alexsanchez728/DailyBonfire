import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'editcontent',
    templateUrl: './editcontent.component.html',
})
export class EditContentComponent {
    public boards: board[];
    public selection: number | null;
    public content: contentDisplayable;
    public usercontenttoput: userContentDto;
    public contenttoput: contentDto;
    private currentuser = 7;
    private router: any

    private http: Http;
    private url: string;
    private checkboxvalue: boolean;

    constructor(router: Router, route: ActivatedRoute, http: Http, @Inject('API_URL') apiUrl: string) {

        this.boards = {} as board[];
        this.usercontenttoput = {} as userContentDto;
        this.contenttoput = {} as contentDto;
        this.content = {} as contentDisplayable;
        this.router = router;

        this.http = http;
        this.url = apiUrl;

        this.selection = Number(route.snapshot.paramMap.get('id'));

        http.get(apiUrl + '/api/UserContent/content/' + this.selection).subscribe(result => {
            this.content = result.json() as contentDisplayable;

            console.log(this.content);
        }, error => console.error(error));

        http.get(apiUrl + '/api/UserBoards/' + this.currentuser + '/' + this.currentuser).subscribe(result => {
            this.boards = result.json() as board[];
        }, error => console.error(error));

    }

    back() {
        this.router.navigateByUrl('my-home');
    }

    change(event: any) {
        this.usercontenttoput.isPublic = event;
    }


    onClickSubmit(data: any) {
        //this.usercontenttoput.userId = this.currentuser;
        //this.usercontenttoput.userBoardId = this.boards.boardId;
        //this.http.put(this.url + '/api/UserBoards/' + this.selection, this.userboardtoput).subscribe(result => { }, error => console.error(error));

        //this.http.put(this.url + '/api/boards/' + this.userboardtoput.BoardId, this.boardtoput).subscribe(result => { }, error => console.error(error));

        //console.log(this.url + '/api/UserBoards/By/' + this.currentuser + '/' + data.boardId);

        //    this.contenttoput.title = data.title;
        //    this.contenttoput.url = 'http://' + data.url;

        //    this.boardtoput.Title = data.title;
        //    this.boardtoput.DescriptionFromUser = data.descriptionFromUser;



        //    this.http.get(this.url + '/api/UserBoards/By/' + this.currentuser + '/' + data.boardId).subscribe(result => {
        //        this.newuserboardresult = result.json();

        //        this.http.post(this.url + '/api/Content', this.contenttopost).subscribe(res => {
        //            this.newcontentresult = res.json()


        //            this.usercontenttopost.userId = 7;
        //            this.usercontenttopost.contentId = this.newcontentresult.id;
        //            this.usercontenttopost.userBoardId = this.newuserboardresult.boardId;
        //            this.usercontenttopost.userDescription = data.userDescription;
        //            this.usercontenttopost.isPublic = data.isPublic;

        //            this.http.post(this.url + '/api/UserContent', this.usercontenttopost).subscribe(res => { });
        this.back();
    }

    deleteContent(contentId: number) {
        this.http.delete(this.url + '/api/UserContent/' + contentId).subscribe(result => {
            this.back();
        }, error => console.error(error));
    }

}

interface board {
    boardId: number,
    title: string,
}

interface contentDisplayable {
    userId: number,
    contentId: number,
    userBoardId: number,
    userName: string,
    title: string,
    url: string,
    userDescription: string,
    websiteDescription: string,
    isPublic: boolean,
    boardName: string,
}

interface contentDto {
    id: number,
    title: string,
    url: string,
}

interface userContentDto {
    id: number,
    userId: number,
    contentId: number,
    userBoardId: number,
    userDescription: string,
    isPublic: boolean,
}
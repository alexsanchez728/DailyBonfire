import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'editcontent',
    templateUrl: './editcontent.component.html',
})
export class EditContentComponent {
    public userboardoptions: userBoard[];
    public chosenusercontentid: number;
    public content: contentDisplayable;
    public usercontenttoupdate: userContentDto;
    public contenttoupdate: contentDto;
    private currentuser = 7;
    private router: any

    private http: Http;
    private url: string;

    constructor(router: Router, route: ActivatedRoute, http: Http, @Inject('API_URL') apiUrl: string) {

        this.userboardoptions = [] as userBoard[];
        this.usercontenttoupdate = {} as userContentDto;
        this.contenttoupdate = {} as contentDto;
        this.content = {} as contentDisplayable;
        this.router = router;

        this.http = http;
        this.url = apiUrl;

        this.chosenusercontentid = Number(route.snapshot.paramMap.get('id'));
        http.get(apiUrl + '/api/UserContent/content/' + this.chosenusercontentid).subscribe(result => {
            // not getting ID back, i need that to make the put request, i cant put by contentId
            this.content = result.json() as contentDisplayable;
            this.content.url = this.content.url.replace('https://', '').replace('http://', '')


        }, error => console.error(error));

        http.get(apiUrl + '/api/UserBoards/' + this.currentuser + '/' + this.currentuser).subscribe(result => {
            this.userboardoptions = result.json() as userBoard[];
        }, error => console.error(error));

    }

    back() {
        this.router.navigateByUrl('userhome/' + this.currentuser);
    }

    changePublicStatus(event: any) {
        this.usercontenttoupdate.isPublic = event;
    }

    changeUserBoard(event: any) {
        this.usercontenttoupdate.userBoardId = event.id;
    }

    onClickSubmit(data: contentDisplayable) {

        this.usercontenttoupdate.id = this.content.id;
        this.usercontenttoupdate.userId = this.currentuser;
        this.usercontenttoupdate.contentId = this.content.contentId;
        this.usercontenttoupdate.userBoardId = data.userBoardId;
        this.usercontenttoupdate.userDescription = data.userDescription;

        this.contenttoupdate.id = this.usercontenttoupdate.userBoardId;
        this.contenttoupdate.title = data.contentTitle;
        this.contenttoupdate.url = data.url;

        this.http.put(this.url + '/api/UserContent/' + this.usercontenttoupdate.id, this.usercontenttoupdate).subscribe(result => {

            this.http.put(this.url + '/api/Content/' + this.contenttoupdate.id, this.contenttoupdate).subscribe(result => {

                this.back();

            }, error => console.error(error));

        }, error => console.error(error));

    }

    deleteContent(contentId: number) {
        this.http.delete(this.url + '/api/UserContent/' + contentId).subscribe(result => {
            this.back();
        }, error => console.error(error));
    }

}

interface userBoard {
    id: number | null,
    boardId: number | null,
    title: string,
}

interface contentDisplayable {
    id: number,
    userId: number,
    contentId: number,
    userBoardId: number,
    contentTitle: string,
    url: string,
    userDescription: string,
    isPublic: boolean,
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
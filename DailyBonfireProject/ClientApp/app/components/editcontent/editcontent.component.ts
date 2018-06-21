import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'editcontent',
    templateUrl: './editcontent.component.html',
})
export class EditContentComponent {
    public userBoardOptions: UserBoard[];
    public chosenUserContentId: number;
    public content: ContentDisplayable;
    public userContentToUpdate: UserContentDto;
    public contentToUpdate: ContentDto;
    private currentUser: number;
    private router: any

    private http: Http;
    private url: string;

    constructor(router: Router, route: ActivatedRoute, http: Http, @Inject('API_URL') apiUrl: string, @Inject('currentUser') currentUser: number) {

        this.userBoardOptions = [] as UserBoard[];
        this.userContentToUpdate = {} as UserContentDto;
        this.contentToUpdate = {} as ContentDto;
        this.content = {} as ContentDisplayable;

        this.router = router;
        this.currentUser = currentUser;
        this.http = http;
        this.url = apiUrl;

        this.chosenUserContentId = Number(route.snapshot.paramMap.get('id'));
        http.get(apiUrl + '/api/UserContent/content/' + this.chosenUserContentId).subscribe(result => {
            this.content = result.json() as ContentDisplayable;
            this.content.url = this.content.url.replace('https://', '').replace('http://', '')


        }, error => console.error(error));

        http.get(apiUrl + '/api/UserBoards/' + this.currentUser + '/' + this.currentUser).subscribe(result => {
            this.userBoardOptions = result.json() as UserBoard[];
        }, error => console.error(error));

    }

    back() {
        this.router.navigateByUrl('userhome/' + this.currentUser);
    }

    changePublicStatus(event: any) {
        this.userContentToUpdate.isPublic = event;
    }

    changeUserBoard(event: any) {
        this.userContentToUpdate.userBoardId = event.id;
    }

    onClickSubmit(data: any) {
        this.FillInContentToUpdate(data);
    }

    FillInContentToUpdate(data: any) {
        console.log(data.url);
        this.userContentToUpdate.id = this.content.id;
        this.userContentToUpdate.userId = this.currentUser;
        this.userContentToUpdate.contentId = this.content.contentId;
        this.userContentToUpdate.userBoardId = data.userBoardId;
        this.userContentToUpdate.userDescription = data.userDescription;

        this.contentToUpdate.id = this.userContentToUpdate.userBoardId;
        this.contentToUpdate.title = data.contentTitle;
        this.contentToUpdate.url = data.url;

        console.log(this.contentToUpdate);
        return this.Update();
    }

    Update() {
        this.http.put(this.url + '/api/UserContent/' + this.userContentToUpdate.id, this.userContentToUpdate).subscribe(result => { }, error => console.error(error));

        this.http.put(this.url + '/api/Content/' + this.contentToUpdate.id, this.contentToUpdate).subscribe(result => {

            this.back();

        }, error => console.error(error));

    }

    deleteContent(contentId: number) {
        this.http.delete(this.url + '/api/UserContent/' + contentId).subscribe(result => {
            this.back();
        }, error => console.error(error));
    }

}

interface UserBoard {
    id: number | null,
    boardId: number | null,
    title: string,
}

interface ContentDisplayable {
    id: number,
    userId: number,
    contentId: number,
    userBoardId: number,
    contentTitle: string,
    url: string,
    userDescription: string,
    isPublic: boolean,
}

interface ContentDto {
    id: number,
    title: string,
    url: string,
    websiteDescription: string,
}

interface UserContentDto {
    id: number,
    userId: number,
    contentId: number,
    userBoardId: number,
    userDescription: string,
    isPublic: boolean,
}
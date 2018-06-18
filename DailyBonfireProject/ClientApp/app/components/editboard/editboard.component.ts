import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'editboard',
    templateUrl: './editboard.component.html',
})
export class EditBoardComponent {

    public userBoardSelected: boarddisplayable;
    private userBoardToUpdate: userboard;
    private boardToUpdate: BoardsDto;

    private selection: number | null;
    private currentUser: number;
    private contentWithMatchingBoardId: userContentDto[];

    private http: Http;
    private router: Router;
    private url: string;

    constructor(router: Router, route: ActivatedRoute, http: Http, @Inject('API_URL') apiUrl: string) {

        this.http = http;
        this.url = apiUrl;
        this.router = router;

        this.currentUser = 7;

        this.boardToUpdate = {} as BoardsDto;
        this.userBoardToUpdate = {} as userboard;
        this.userBoardSelected = {} as boarddisplayable;

        this.selection = Number(route.snapshot.paramMap.get('id'));
        http.get(apiUrl + '/api/UserBoards/' + this.selection).subscribe(result => {
            this.userBoardSelected = result.json() as boarddisplayable;

            this.userBoardToUpdate.userId = this.currentUser;
            this.userBoardToUpdate.boardId = this.userBoardSelected.boardId;
            this.userBoardToUpdate.id = this.userBoardSelected.id;

        }, error => console.error(error));
    }


    change(event: any) {
        this.userBoardToUpdate.isPublic = event;
    }

    back() {
        this.router.navigateByUrl('my-home-boards');
    }

    onClickSubmit(data: any) {


        this.boardToUpdate.title = data.title;
        this.boardToUpdate.descriptionFromUser = data.descriptionFromUser;
        this.boardToUpdate.id = this.userBoardToUpdate.boardId;

        this.http.put(this.url + '/api/UserBoards/' + this.selection, this.userBoardToUpdate).subscribe(result => {

            this.http.put(this.url + '/api/boards/' + this.userBoardToUpdate.boardId, this.boardToUpdate).subscribe(result => { }, error => console.error(error));

            this.back();
        }, error => console.error(error));


    }

    deleteBoard(boardId: number) {
        if (this.userBoardSelected.userId === this.currentUser) {

            // Change UserContent, anything with a UserContent.UserBoardId FK ...
            // That matches the UserBoard.Id we're trying to delete, should be changed to null

            console.log(this.url + '/api/UserContent/board/' + this.userBoardToUpdate.boardId + '/' + this.currentUser);
            this.http.get(this.url + '/api/UserContent/board/' + this.userBoardToUpdate.boardId + '/' + this.currentUser).subscribe(result => {
                this.contentWithMatchingBoardId = result.json() as userContentDto[];

                if (this.contentWithMatchingBoardId.length >= 1) {

                    for (let item of this.contentWithMatchingBoardId) {
                        item.userBoardId = null;

                        this.http.put(this.url + '/api/UserContent/' + item.contentId, item).subscribe(res => {

                            this.http.delete(this.url + '/api/UserBoards/' + this.selection).subscribe(r => {

                                this.back();

                            }, error => console.error(error));

                        }, error => console.error(error));
                    };
                } else {

                    this.http.delete(this.url + '/api/UserBoards/' + this.selection).subscribe(res => {

                        this.back();

                    }, error => console.error(error));
                }


            }, error => console.error(error));
        }
    }

}
interface userboard {
    id: number,
    userId: number,
    boardId: number,
    isPublic: boolean,
}

interface boarddisplayable {
    id: number,
    boardId: number,
    userName: string,
    userId: number,
    title: string,
    descriptionFromUser: string,
    isPublic: boolean,
}

interface BoardsDto {
    id: number
    title: string,
    descriptionFromUser: string,
}

interface userContentDto {
    id: number,
    userId: number,
    contentId: number,
    userBoardId: number | null,
    userDescription: string,
    isPublic: boolean,
}
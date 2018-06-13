import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    public content: contentDisplayable[];
    public http: Http;
    public url: string;

    constructor(http: Http, @Inject('API_URL') apiUrl: string) {

        this.http = http;
        this.url = apiUrl;

        http.get(apiUrl + '/api/UserContent/7').subscribe(result => {
            this.content = result.json() as contentDisplayable[];

            for (let i in this.content) {
                this.http.get(this.url + '/api/userBoards/' + this.content[i].userBoardId).subscribe(result => {

                    if (result.json() === null) {
                        this.content[i].userName = 'No User Available';
                    }
                    this.content[i].userName = result.json().userName;

                }, error => console.error(error));
            }
        }, error => console.error(error));

    }


    public open(selectedContent: any) {
        this.open(selectedContent);
    }
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
// also need userName of who posted
// also need which board it's on
// also need a way to POST this content from here
//export class BoardComponent {
//    public board: board;
//    public content: content[];
//    private selection: number | null

//    constructor(route: ActivatedRoute, http: Http, @Inject('API_URL') apiUrl: string) {

//        this.board = {} as board;
//        this.selection = Number(route.snapshot.paramMap.get('id'));

//        http.get(apiUrl + '/api/UserBoards/' + this.selection).subscribe(result => {
//            this.board = result.json() as board;

//            http.get(apiUrl + '/api/UserContent/board/' + this.board.boardId).subscribe(result => {
//                this.content = result.json() as content[];
//            }, error => console.error(error));
//        }, error => console.error(error));
//    }
//}

//interface board {
//    boardId: number,
//    userName: string,
//    userId: number,
//    title: string,
//    descriptionFromUser: string,
//    isPublic: boolean,
//}
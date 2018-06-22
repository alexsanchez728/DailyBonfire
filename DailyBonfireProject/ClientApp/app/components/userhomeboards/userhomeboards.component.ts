import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'userhomeboards',
    templateUrl: './userhomeboards.component.html',
    styleUrls: ['./userhomeboards.component.css']

})
export class UserHomeBoardsComponent {
    public boards: Boards[];
    public userName: string;
    public userId: number;
    public selection: number;

    public currentUser: number;

    constructor(http: Http, route: ActivatedRoute, @Inject('API_URL') apiUrl: string, @Inject('currentUser') currentUser: number) {

        this.selection = Number(route.snapshot.paramMap.get('id'));
        this.currentUser = currentUser;

        http.get(apiUrl + '/api/user/' + this.selection).subscribe(res => {
            this.userName = res.json().name;
            this.userId = res.json().id;
        });

        http.get(apiUrl + '/api/UserBoards/' + this.currentUser + '/' + this.selection).subscribe(result => {
            this.boards = result.json() as Boards[];
        }, error => console.error(error));
    }

    canAdd() {
        return this.currentUser == this.selection ? true : false
    }
}


interface Boards {
    id: number,
    boardId: number,
    userName: string,
    title: string,
    descriptionFromUser: string,
    isPublic: boolean,
}
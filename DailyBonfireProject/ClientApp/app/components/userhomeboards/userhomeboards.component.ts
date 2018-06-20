import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'userhomeboards',
    templateUrl: './userhomeboards.component.html',
})
export class UserHomeBoardsComponent {
    public boards: Boards[];
    public userName: string;
    public selection: number;

    public currentUser = 7;

    constructor(http: Http, route: ActivatedRoute, @Inject('API_URL') apiUrl: string) {

        this.selection = Number(route.snapshot.paramMap.get('id'));
        http.get(apiUrl + '/api/user/' + this.selection).subscribe(res => {
            this.userName = res.json().name;
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
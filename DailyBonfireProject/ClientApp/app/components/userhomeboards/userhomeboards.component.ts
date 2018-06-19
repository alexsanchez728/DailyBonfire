import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'userhomeboards',
    templateUrl: './userhomeboards.component.html',
})
export class UserHomeBoardsComponent {
    public boards: boards[];
    public userName: string;
    public selection: number;

    public currentUser = 7;

    constructor(http: Http, route: ActivatedRoute, @Inject('API_URL') apiUrl: string) {

        this.selection = Number(route.snapshot.paramMap.get('id'));
        http.get(apiUrl + '/api/user/' + this.selection).subscribe(res => {
            this.userName = res.json().name;
        });

        http.get(apiUrl + '/api/UserBoards/' + this.currentUser + '/' + this.selection).subscribe(result => {
            this.boards = result.json() as boards[];
        }, error => console.error(error));
    }

    canAdd() {
        return this.currentUser == this.selection ? true : false
    }
}


interface boards {
    id: number,
    boardId: number,
    userName: string,
    title: string,
    descriptionFromUser: string,
    isPublic: boolean,
}
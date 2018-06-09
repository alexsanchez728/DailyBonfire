import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'my-home-boards',
    templateUrl: './myhomeboards.component.html',
})
export class MyHomeBoardsComponent {
    public boards: boards[];

    constructor(http: Http, @Inject('API_URL') apiUrl: string) {
        http.get(apiUrl + '/api/UserBoards/7/7').subscribe(result => {
            this.boards = result.json() as boards[];
        }, error => console.error(error));
    }
    // When i go to my boards page
    // Then I should see cards displaying with all my boards
    
    // When I select a board
    // I should see all the content that is saved to that board
    // 
}

interface boards {
    Title: string;
    DescriptionFromUser: string;
    IsPublic: boolean;
}
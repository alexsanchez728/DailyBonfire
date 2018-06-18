import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'userhome',
    templateUrl: './userhome.component.html'
})
export class UserHomeComponent {
    public content: content[];
    public selection: number;

    public currentUser = 7

    constructor(http: Http, route: ActivatedRoute, @Inject('API_URL') apiUrl: string) {

        this.selection = Number(route.snapshot.paramMap.get('id'));

        http.get(apiUrl + '/api/UserContent/see/' + this.currentUser + '/' + this.selection).subscribe(result => {
            this.content = result.json() as content[];
        }, error => console.error(error));
    }
}

interface content {
    userId: number,
    contentId: number,
    userBoardId: number,
    contentTitle: string,
    boardTitle: string,
    url: string,
    userDescription: string,
    websiteDescription: string,
    isPublic: boolean;
}
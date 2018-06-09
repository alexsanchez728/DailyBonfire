import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    public content: content[];

    constructor(http: Http, @Inject('API_URL') apiUrl: string) {
        http.get(apiUrl + '/api/UserContent/7').subscribe(result => {
            this.content = result.json() as content[];
        }, error => console.error(error));
    }

    public open(selectedContent: any) {
        this.open(selectedContent);
    }
}

interface content {
    Id: number;
    Title: string;
    Url: string;
    UserDescription: string;
    WebsiteDescription: string;
    IsPublic: boolean;
}

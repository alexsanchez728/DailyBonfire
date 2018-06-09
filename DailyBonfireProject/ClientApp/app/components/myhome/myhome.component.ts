import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'myhome',
    templateUrl: './myhome.component.html'
})
export class MyHomeComponent {
    public content: content[];

    constructor(http: Http, @Inject('API_URL') apiUrl: string) {
        http.get(apiUrl + '/api/UserContent/see/7/7').subscribe(result => {
            this.content = result.json() as content[];
        }, error => console.error(error));
    }
}

interface content {
    Title: string;
    Url: string;
    UserDescription: string;
    WebsiteDescription: string;
    IsPublic: boolean;
}
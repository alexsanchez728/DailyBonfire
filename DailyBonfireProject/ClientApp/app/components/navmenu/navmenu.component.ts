import { Component, Inject } from '@angular/core';

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent {
    public currentUser: number;

    constructor( @Inject('currentUser') currentUser: number) {
        this.currentUser = currentUser;
    }
}
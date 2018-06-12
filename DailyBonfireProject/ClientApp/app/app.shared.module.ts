import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, ActivatedRoute } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { MyHomeComponent } from './components/myhome/myhome.component';
import { BoardComponent } from './components/board/board.component';
import { MyHomeBoardsComponent } from './components/myhomeboards/myhomeboards.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        MyHomeComponent,
        MyHomeBoardsComponent,
        BoardComponent,
        ProfileComponent,
        HomeComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'my-home', component: MyHomeComponent },
            { path: 'my-home-boards', component: MyHomeBoardsComponent },
            { path: 'boards/:id', component: BoardComponent },
            { path: 'profile', component: ProfileComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModuleShared {
}

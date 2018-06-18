import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, ActivatedRoute } from '@angular/router';


import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';

import { HomeComponent } from './components/home/home.component';
import { UserHomeComponent } from './components/userhome/userhome.component';

import { MyHomeBoardsComponent } from './components/myhomeboards/myhomeboards.component';

import { NewContentComponent } from './components/newcontent/newcontent.component';
import { EditContentComponent } from './components/Editcontent/editcontent.component';

import { BoardComponent } from './components/board/board.component';
import { EditBoardComponent } from './components/editboard/editboard.component';
import { NewBoardComponent } from './components/newboard/newboard.component';

import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,

        HomeComponent,
        UserHomeComponent,

        MyHomeBoardsComponent,

        NewContentComponent,
        EditContentComponent,

        BoardComponent,
        EditBoardComponent,
        NewBoardComponent,

        ProfileComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'userhome/:id', component: UserHomeComponent },
            { path: 'my-home-boards', component: MyHomeBoardsComponent },
            { path: 'editboard/:id', component: EditBoardComponent },
            { path: 'newboard', component: NewBoardComponent },
            { path: 'newcontent', component: NewContentComponent },
            { path: 'editcontent/:id', component: EditContentComponent },
            { path: 'boards/:id', component: BoardComponent },
            { path: 'profile', component: ProfileComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModuleShared {
}

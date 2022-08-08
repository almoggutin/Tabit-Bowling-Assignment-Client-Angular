import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { GamePageComponent } from './pages/game-page/game-page.component';
import { ScoresPageComponent } from './pages/scores-page/scores-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';

import { AuthGuard } from './guards/auth.guard';
import { ScoresResolver } from './resolvers/scores.resolver';

const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'home', redirectTo: '' },
    { path: 'game', component: GamePageComponent },
    {
        path: 'scores',
        component: ScoresPageComponent,
        resolve: {
            scores: ScoresResolver,
        },
    },
    { path: '**', component: ErrorPageComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    providers: [AuthGuard],
    exports: [RouterModule],
})
export class AppRoutingModule {}

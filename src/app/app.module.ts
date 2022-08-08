import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { GamePageComponent } from './pages/game-page/game-page.component';
import { ScoresPageComponent } from './pages/scores-page/scores-page.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { LoaderComponent } from './components/shared/loader/loader.component';
import { PlayerDetailsFormComponent } from './pages/home-page/player-details-form/player-details-form.component';
import { ScoresComponent } from './pages/scores-page/scores/scores.component';
import { ScoreItemComponent } from './pages/scores-page/scores/score-item/score-item.component';
import { GameFormComponent } from './pages/game-page/game-form/game-form.component';
import { ButtonComponent } from './components/button/button.component';
import { ScoreboardComponent } from './pages/game-page/scoreboard/scoreboard.component';
import { FrameComponent } from './pages/game-page/scoreboard/frame/frame.component';

@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        GamePageComponent,
        ScoresPageComponent,
        HeaderComponent,
        FooterComponent,
        LoaderComponent,
        PlayerDetailsFormComponent,
        ScoresComponent,
        ScoreItemComponent,
        GameFormComponent,
        ButtonComponent,
        ScoreboardComponent,
        FrameComponent,
    ],
    imports: [BrowserModule, FormsModule, AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}

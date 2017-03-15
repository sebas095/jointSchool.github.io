import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RegisterPage } from '../pages/register/register';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { ChallengePage } from '../pages/challenge/challenge';
import { ScorePage } from '../pages/score/score';
import { GamePage } from '../pages/game/game';

@NgModule({
  declarations: [
    MyApp,
    RegisterPage,
    LoginPage,
    ProfilePage,
    HomePage,
    ChallengePage,
    ScorePage,
    GamePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RegisterPage,
    LoginPage,
    ProfilePage,
    HomePage,
    ChallengePage,
    ScorePage,
    GamePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}

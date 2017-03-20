import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { AuthService } from '../services/auth.service';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RegisterPage } from '../pages/register/register';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { EditPage } from '../pages/edit/edit';
import { ChallengePage } from '../pages/challenge/challenge';
import { ScorePage } from '../pages/score/score';
import { GamePage } from '../pages/game/game';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';

// AF2 settings
const firebaseConfig = {
  apiKey: "AIzaSyBPisog4PaukdlLPvGQTLaJRwTMdwH1mgU",
  authDomain: "jointschool-388bb.firebaseapp.com",
  databaseURL: "https://jointschool-388bb.firebaseio.com",
  storageBucket: "jointschool-388bb.appspot.com",
  messagingSenderId: "566779487328"
};

const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

@NgModule({
  declarations: [
    MyApp,
    RegisterPage,
    LoginPage,
    ProfilePage,
    EditPage,
    HomePage,
    ChallengePage,
    ScorePage,
    GamePage,
    ResetPasswordPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RegisterPage,
    LoginPage,
    ProfilePage,
    EditPage,
    HomePage,
    ChallengePage,
    ScorePage,
    GamePage,
    ResetPasswordPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService
  ]
})
export class AppModule {}

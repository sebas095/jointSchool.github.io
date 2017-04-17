import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/auth.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ScoreComponent } from './components/score/score.component';
import { GameComponent } from './components/game/game.component';
import { ChallengeComponent } from './components/challenge/challenge.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

// AF2 settings
const firebaseConfig = {
  apiKey: "AIzaSyBPisog4PaukdlLPvGQTLaJRwTMdwH1mgU",
  authDomain: "jointschool-388bb.firebaseapp.com",
  databaseURL: "https://jointschool-388bb.firebaseio.com",
  storageBucket: "jointschool-388bb.appspot.com",
  messagingSenderId: "566779487328"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ProfileComponent,
    ResetPasswordComponent,
    ScoreComponent,
    GameComponent,
    ChallengeComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    FlashMessagesModule,
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

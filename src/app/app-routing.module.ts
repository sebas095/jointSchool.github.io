import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { LoginComponent } from './components/login/login.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChallengeComponent } from './components/challenge/challenge.component';
import { GameComponent } from './components/game/game.component';
import { ScoreComponent } from './components/score/score.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'user/create', component: RegisterComponent},
      {path: 'user/edit', component: EditProfileComponent},
      {path: 'user/recovery', component: ResetPasswordComponent},
      {path: 'user/profile', component: ProfileComponent},
      {path: 'login', component: LoginComponent},
      {path: 'challenges/list', component: ChallengeComponent},
      {path: 'challenges/:id', component: GameComponent},
      {path: 'scores', component: ScoreComponent}
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

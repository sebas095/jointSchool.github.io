import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  email: string = '';
  message: string = '';

  constructor(private router: Router, public auth: AuthService, public fms: FlashMessagesService) { }

  ngOnInit() {
  }

  resetPassword() {
    this.auth.resetPassword(this.email)
      .then(user => {
        this.router.navigate(['/login']);
        this.fms.show('Acabamos de enviarte un enlace a tú correo electrónico para restablecer tú contraseña', {
          cssClass: 'alert-success',
          timeout: 4000
        });
      }).catch(err => {
        this.message = err.message;
        this.router.navigate(['/user/recovery']);
      });
  }
}

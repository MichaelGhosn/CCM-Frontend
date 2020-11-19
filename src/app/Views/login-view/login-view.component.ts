import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../Services/Authentication/authentication.service';
import {ILoginForm} from '../../Models/Authentication/ILoginForm';
import {IResponseModel} from '../../Models/IResponseModel';
import {IAuthenticated} from '../../Models/Authentication/IAuthenticated';
import {NotificationService} from '../../Services/Notification/notification.service';
import {Router} from '@angular/router';
import jwt_decode from 'jwt-decode';
import {ITokenModel} from '../../Models/Authentication/ITokenModel';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
              private notificationService: NotificationService,
              private router: Router,
              private translate: TranslateService) { }

  ngOnInit(): void {}


  Authenticate(credentials: ILoginForm): void {
    this.notificationService.dataLoading = true;

    this.authenticationService.Authenticate(credentials).subscribe((response: IResponseModel<IAuthenticated>) => {

      this.notificationService.dataLoading = false;

      if (response.success) {
        localStorage.setItem('_token', JSON.stringify(response.data.jwt));
        const token = jwt_decode<ITokenModel>(response.data.jwt);

        switch (token.RoleName.toLowerCase()) {
          case 'admin':
            this.router.navigate(['admin']);
            break;
          default:
            this.router.navigate(['user']);
            break;
        }

      } else {
        this.notificationService.DisplaySnackBar(this.translate.currentLang === 'en' ? 'Incorrect username or password' : 'Identifiant ou mot de passe incorrecte');
      }


     });
  }

}

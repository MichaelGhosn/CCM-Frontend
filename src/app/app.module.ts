import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginViewComponent } from './Views/login-view/login-view.component';
import { WelcomeTextComponent } from './Components/welcome-text/welcome-text.component';
import { LoginFormComponent } from './Components/login-form/login-form.component';
import {FlexModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AdminViewComponent } from './Views/admin-view/admin-view.component';
import { UserViewComponent } from './Views/user-view/user-view.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { TranslateSectionComponent } from './Components/toolbar/translate-section/translate-section.component';
import { ToolbarComponent } from './Components/toolbar/toolbar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { AddOrganisationDialogComponent } from './Components/add-organisation-dialog/add-organisation-dialog.component';
import { AddUserDialogComponent } from './Components/add-user-dialog/add-user-dialog.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {TokenInterceptorService} from './Services/TokenInterceptor/token-interceptor.service';
import {MatSelectModule} from '@angular/material/select';
import { SidenavComponent } from './Components/sidenav/sidenav.component';
import { AddMapDialogComponent } from './Components/add-map-dialog/add-map-dialog.component';
import { ViewMapDialogComponent } from './Components/view-map-dialog/view-map-dialog.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { AdjustOpeningTimeDialogComponent } from './Components/adjust-opening-time-dialog/adjust-opening-time-dialog.component';
import { UserReservationsDialogComponent } from './Components/user-reservations-dialog/user-reservations-dialog.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    LoginViewComponent,
    WelcomeTextComponent,
    LoginFormComponent,
    AdminViewComponent,
    UserViewComponent,
    TranslateSectionComponent,
    ToolbarComponent,
    AddOrganisationDialogComponent,
    AddUserDialogComponent,
    SidenavComponent,
    SidenavComponent,
    AddMapDialogComponent,
    ViewMapDialogComponent,
    AdjustOpeningTimeDialogComponent,
    UserReservationsDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatSelectModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule,
    MatPaginatorModule,
    MatTableModule,
  ],
  entryComponents: [AddOrganisationDialogComponent, AddUserDialogComponent, ViewMapDialogComponent,
          AddMapDialogComponent, AdjustOpeningTimeDialogComponent, UserReservationsDialogComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http);
}

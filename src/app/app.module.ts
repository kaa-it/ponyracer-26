import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { RacesComponent } from './races/races.component';
import { RaceService } from './race.service';
import { RaceComponent } from './race/race.component';
import { PonyComponent } from './pony/pony.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FromNowPipe } from './from-now.pipe';
import { HomeComponent } from './home/home.component';
import { ROUTES } from './app.routes';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './user.service';
import { LoginComponent } from './login/login.component';
import { JwtInterceptor } from './jwt.interceptor';
import { BetComponent } from './bet/bet.component';
import { LiveComponent } from './live/live.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    RacesComponent,
    RaceComponent,
    PonyComponent,
    FromNowPipe,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    BetComponent,
    LiveComponent
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule, RouterModule.forRoot(ROUTES)],
  providers: [RaceService, UserService, { provide: HTTP_INTERCEPTORS, useExisting: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {}

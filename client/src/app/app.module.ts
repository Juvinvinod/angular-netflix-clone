import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import { MaterialModule } from 'src/material.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserlistingComponent } from './userlisting/userlisting.component';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { ProfileComponent } from './profile/profile.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { spinnerReducer } from './store/shared/shared.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { loginReducer } from './store/auth/login-page.reducer';
import { CreateComponent } from './userlisting/create/create.component';
import { AuthEffects } from './store/auth/auth.effects';
import { AuthReducer } from './store/auth/auth.reducer';
import { CookieService } from 'ngx-cookie-service';
 
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UserlistingComponent,
    ProfileComponent,
    LoadingSpinnerComponent,
    CreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot({loader:spinnerReducer,loginAuth:loginReducer,auth:AuthReducer}),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot(),
    EffectsModule.forFeature(AuthEffects),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectOutsideZone: true // If set to true, the connection is established outside the Angular zone for better performance
    }),
    FormsModule,
  ],
  providers: [
    CookieService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptor,
      multi:true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

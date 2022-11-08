import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSnackBarModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyCNXFk5pTLMFoVqKCP79M2z94CH3hfwgVI',
      authDomain: 'nestjs-auth-ae985.firebaseapp.com',
      projectId: 'nestjs-auth-ae985',
      storageBucket: 'nestjs-auth-ae985.appspot.com',
      messagingSenderId: '412889347826',
      appId: '1:412889347826:web:3d3a8e204d93822184c26b',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

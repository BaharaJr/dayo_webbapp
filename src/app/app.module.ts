import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { components } from './components';
import { modules } from './modules';

@NgModule({
  declarations: [AppComponent, ...components],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ...modules,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyCNXFk5pTLMFoVqKCP79M2z94CH3hfwgVI',
      authDomain: 'nestjs-auth-ae985.firebaseapp.com',
      projectId: 'nestjs-auth-ae985',
      storageBucket: 'nestjs-auth-ae985.appspot.com',
      messagingSenderId: '412889347826',
      appId: '1:412889347826:web:3d3a8e204d93822184c26b',
    }),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

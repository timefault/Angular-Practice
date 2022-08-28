import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { JokeComponent } from './joke/joke.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { JokePageComponent } from './joke-page/joke-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'jokepage', component: JokePageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    JokeComponent,
    HomeComponent,
    JokePageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatCheckboxModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

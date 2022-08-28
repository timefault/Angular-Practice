import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { JokeComponent } from './components/joke/joke.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { JokePageComponent } from './components/joke-page/joke-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WeatherPageComponent } from './components/weather-page/weather-page.component';
import { BulletinBoardComponent } from './components/bulletin-board/bulletin-board.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'jokepage', component: JokePageComponent },
  { path: 'weatherpage', component: WeatherPageComponent },
  { path: 'bulletinboard', component: BulletinBoardComponent }

];

@NgModule({
  declarations: [
    AppComponent,
    JokeComponent,
    HomeComponent,
    JokePageComponent,
    NavbarComponent,
    WeatherPageComponent,
    BulletinBoardComponent
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

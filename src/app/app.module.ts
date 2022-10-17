import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { JokeComponent } from './components/joke/joke.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { HomeComponent } from './components/home/home.component';
import { JokePageComponent } from './components/joke-page/joke-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WeatherPageComponent } from './components/weather-page/weather-page.component';
import { BulletinBoardComponent } from './components/bulletin-board/bulletin-board.component';
import { MapComponent } from './components/map/map.component';
import { SliderComponent } from './components/slider/slider.component';
import { PostComponent } from './components/post/post.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { HourlyWeatherComponent } from './components/hourly-weather/hourly-weather.component';
import { NewQuestionComponent } from './components/new-question/new-question.component';
import { ReplyFormComponent } from './components/reply-form/reply-form.component';

import { UnescapePipe } from './pipes/unescape-html.pipe';


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
    BulletinBoardComponent,
    MapComponent,
    SliderComponent,
    PostComponent,
    SidebarComponent,
    MainContentComponent,
    HourlyWeatherComponent,
    NewQuestionComponent,
    ReplyFormComponent,
    UnescapePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatCheckboxModule,
    MatSliderModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

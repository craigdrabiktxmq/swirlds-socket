import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { MatCardModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ApiModule, DefaultService } from '../api/index';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: '/home' }
]
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    ApiModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    FlexLayoutModule
  ],
  providers: [DefaultService],
  bootstrap: [AppComponent]
})
export class AppModule { }
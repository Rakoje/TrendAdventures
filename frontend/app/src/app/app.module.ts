import { NgModule } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {provideImageKitLoader} from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EnglishComponent } from './english/english.component';
import { MneComponent } from './mne/mne.component';

@NgModule({
  declarations: [
    AppComponent,
    EnglishComponent,
    MneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    provideImageKitLoader("https://ik.imagekit.io/arungudelli/")],
  bootstrap: [AppComponent]
})
export class AppModule { }

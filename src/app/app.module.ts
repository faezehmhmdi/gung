import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {CategoryComponent} from './category/category.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {FormsModule} from "@angular/forms";
import {ScrollingModule} from '@angular/cdk/scrolling';


@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    FormsModule,
    ScrollingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

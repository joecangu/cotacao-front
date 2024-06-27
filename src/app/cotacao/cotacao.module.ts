import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { CotacaoRoutingModule } from './cotacao-routing.module';
import { CotacaoComponent } from './cotacao.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [CotacaoComponent],
  imports: [
    CommonModule,
    CotacaoRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserModule
  ],
  exports: [
    CotacaoComponent
  ],
  providers: [DatePipe]
})
export class CotacaoModule { }

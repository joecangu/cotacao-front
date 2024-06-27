import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TemplateModule } from './template/template.module';
import { HomeComponent } from './home/home.component'
import { CotacaoModule } from './cotacao/cotacao.module';
import { GraficoModule } from './grafico/grafico.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TemplateModule,
    CotacaoModule,
    GraficoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

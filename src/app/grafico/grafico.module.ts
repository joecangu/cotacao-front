import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraficoRoutingModule } from './grafico-routing.module';
import { GraficoComponent } from './grafico.component';


@NgModule({
  declarations: [GraficoComponent],
  imports: [
    CommonModule,
    GraficoRoutingModule
  ],
  exports: [
    GraficoComponent
  ]
})
export class GraficoModule { }

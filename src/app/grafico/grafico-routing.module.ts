import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GraficoComponent } from './grafico.component';


const routes: Routes = [
  { path: 'grafico', component: GraficoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GraficoRoutingModule { }

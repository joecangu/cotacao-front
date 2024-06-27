import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cotacao } from './cotacao/cotacao';
import {map} from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class GraficoService {
  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  public getCotacaoPorPeriodoFront(
    dataInicial: string,
    dataFinal: string
  ): Observable<Cotacao[]> {
    return this.http.get<Cotacao[]>(`${this.apiServerUrl}/moeda/${dataInicial}&${dataFinal}`);
  }
}

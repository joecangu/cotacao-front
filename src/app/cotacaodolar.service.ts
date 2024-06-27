import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cotacao } from './cotacao/cotacao';
import {map} from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class CotacaoDolarService {
  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  public getCotacaoAtual(): Observable<number> {
    return this.http.get<any>(`${this.apiServerUrl}/moeda/atual`).pipe(
      map(response => response.preco)
    );
  }

  public getCotacaoPorPeriodoFront(
    dataInicial: string,
    dataFinal: string
  ): Observable<Cotacao[]> {
    return this.http.get<Cotacao[]>(`${this.apiServerUrl}/moeda/${dataInicial}&${dataFinal}`);
  }

  public getCotacaoPorPeriodoAtualMenor(
    dataInicial: string,
    dataFinal: string
  ): Observable<Cotacao[]> {
    return this.http.get<Cotacao[]>(`${this.apiServerUrl}/moeda/atual-menor/${dataInicial}&${dataFinal}`);
  }
}

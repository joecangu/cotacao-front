import { CotacaoDolarService } from './../cotacaodolar.service';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Cotacao } from '../cotacao/cotacao';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit {
  public chart: any;
  dataFinalInput: string | null;
  dataInicialInput: string | null;
  cotacaoPorPeriodoLista: Cotacao[] = [];
  hoje = new Date();

  constructor(
    private cotacaoDolarService: CotacaoDolarService,
    private dateFormat: DatePipe
  ) { }

  ngOnInit(): void {
    this.dataFinalInput = this.dateFormat.transform(this.hoje, 'yyyy-MM-dd');
    this.dataInicialInput = this.getFirstDayOfMonth(this.hoje);

    this.createLineChart();
    this.getCotacaoPorPeriodo(this.dataInicialInput, this.dataFinalInput);
  }

  createLineChart(labels: (string | Date)[] = [], data: number[] = []) {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: labels.length > 0 ? labels.map(label => typeof label === 'string' ? label : this.dateFormat.transform(label, 'yyyy-MM-dd')) : ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Dólar (R$)',
            data: data.length > 0 ? data : [65, 59, 80, 81, 56, 55, 40],
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 2,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Value'
            }
          }
        }
      }
    });
  }

  // Função de consulta cotação por período
  public getCotacaoPorPeriodo(dataInicialString: string, dataFinalString: string): void {
    this.cotacaoPorPeriodoLista = [];

    const dataInicial = this.dateFormat.transform(dataInicialString, "MM-dd-yyyy") || '';
    const dataFinal = this.dateFormat.transform(dataFinalString, "MM-dd-yyyy") || '';

    this.cotacaoDolarService
      .getCotacaoPorPeriodoFront(dataInicial, dataFinal)
      .subscribe(cotacoes => {
        this.cotacaoPorPeriodoLista = cotacoes.map(cotacao => {
          // let diferenca = (this.cotacaoAtual - cotacao.preco).toFixed(2);
          return {
            ...cotacao,
            preco: parseFloat(cotacao.preco.toFixed(2)),
            // diferenca: parseFloat(diferenca),
            data: typeof cotacao.data === 'string' ? cotacao.data : cotacao.data.toISOString()
          };
        });

        const labels = this.cotacaoPorPeriodoLista.map(cotacao => cotacao.data);
        const data = this.cotacaoPorPeriodoLista.map(cotacao => cotacao.preco);

        this.updateChart(labels, data);
      });
  }

  updateChart(labels: (string | Date)[], data: number[]): void {
    this.chart.data.labels = labels.map(label => typeof label === 'string' ? label : this.dateFormat.transform(label, 'yyyy-MM-dd'));
    this.chart.data.datasets[0].data = data;
    this.chart.update();
  }

  getFirstDayOfMonth(date: Date): string {
    return this.dateFormat.transform(new Date(date.getFullYear(), date.getMonth(), 1), 'yyyy-MM-dd') || '';
  }
}

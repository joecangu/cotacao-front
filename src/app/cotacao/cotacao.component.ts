import { CotacaoDolarService } from './../cotacaodolar.service';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Cotacao } from './cotacao';


@Component({
  selector: 'app-cotacao',
  templateUrl: './cotacao.component.html',
  styleUrls: ['./cotacao.component.css']
})
export class CotacaoComponent implements OnInit {
  dataAtual: string;
  dataFinalInput: string | null;
  dataInicialInput: string | null;
  cotacaoAtual:number;
  cotacaoPorPeriodoLista: Cotacao[] = [];
  primeiroDiaMes: Date;
  erro: boolean = false;
  errors: String;
  hoje = new Date();
  isChecked = false;

  constructor(
    private cotacaoDolarService: CotacaoDolarService,
    private dateFormat: DatePipe
  ) {}

  //Funcao de consulta cotacao por periodo
  public getCotacaoPorPeriodo(
    dataInicialString: string,
    dataFinalString: string
  ): void {
    this.cotacaoPorPeriodoLista = [];

    const dataInicial = this.dateFormat.transform(dataInicialString, "MM-dd-yyyy") || '';
    const dataFinal = this.dateFormat.transform(dataFinalString, "MM-dd-yyyy") || '';

    //Verifica se a Data inicial é maior que a Data final
    if(dataInicial > dataFinal){
      this.erro = true;
      this.errors = "O Campo Data inicial não pode ser maior que a Data final!";
    }

    //Verifica se a data inicial e final estão preenchidas
    if (dataInicial && dataFinal) {
      //Se o campo isChecked == false pesquisa por período, se isChecked == true pesquisa por período e cotação menor que a cotação atual
      if(this.isChecked == false){
        this.cotacaoDolarService
        .getCotacaoPorPeriodoFront(dataInicial, dataFinal)
        .subscribe(cotacoes => {
          this.cotacaoPorPeriodoLista = cotacoes.map(cotacao => {
            let diferenca = (this.cotacaoAtual - cotacao.preco).toFixed(2)
            return {
              ...cotacao,
              preco: parseFloat(cotacao.preco.toFixed(2)),
              diferenca: parseFloat(diferenca)
            };
          });
          this.erro = false;
        }, errorResponse => {
          this.erro = true;
          this.errors = "O Campo Data inicial não pode ser maior que a Data final!"
        })
      } else {
        this.cotacaoDolarService
        .getCotacaoPorPeriodoAtualMenor(dataInicial, dataFinal)
        .subscribe(cotacoes => {
          this.cotacaoPorPeriodoLista = cotacoes.map(cotacao => {
            let diferenca = (this.cotacaoAtual - cotacao.preco).toFixed(2)
            return {
              ...cotacao,
              preco: parseFloat(cotacao.preco.toFixed(2)),
              diferenca: parseFloat(diferenca)
            };
          });
          this.erro = false;
        }, errorResponse => {
          this.erro = true;
          this.errors = "Cotação atual ainda não foi atualizada!"
        })
      }
    } else {
      //ALERTA DE ERRO POÍS DATA INICIAL E FINAL SÃO OBRIGATÓRIAS
      this.erro = true;

      if(dataInicial == '' && dataFinal == ''){
        this.errors = "Os campos Data inicial e Data final são obrigatórios!";
      } else if(dataInicial == ''){
        this.errors = "O campo Data inicial é obrigatório!"
      } else if (dataFinal == ''){
        this.errors = "O campo Data final é obrigatório!"
      } else {
        this.errors = "Aconteceu algo inesperado! Tente novamente mais tarde."
      }
    }
  }

  getFirstDayOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  ngOnInit(): void {
    //Formata a data conforme a localidade
    this.dataAtual = this.hoje.toLocaleDateString();

    //Formata a data atual para o padrão correto no input tipo 'date'
    this.dataFinalInput = this.dateFormat.transform(this.hoje, 'yyyy-MM-dd');

    //Chama a função para pegar o primeiro dia do mês
    this.primeiroDiaMes = this.getFirstDayOfMonth(this.hoje);

    //Formata o primeiro dia do mês para o padrão correto no input tipo 'date'
    this.dataInicialInput = this.dateFormat.transform(this.primeiroDiaMes, 'yyyy-MM-dd');

    //A cotação do dia atual, atualiza após as 13hr
    this.cotacaoDolarService
      .getCotacaoAtual()
      .subscribe(cotacao => {
        this.cotacaoAtual = parseFloat(cotacao.toFixed(2));
      })
  }

}

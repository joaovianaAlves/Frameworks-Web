import { Component } from '@angular/core';
import { Tarefa } from "./tarefa";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TODOapp';
  
  //A variável "arrayDeTarefas" foi definida como um array vazio para armazenar objetos do tipo "Tarefa".
  
  arrayDeTarefas: Tarefa[] = [];
  
  //Criando um metodo READ TAREFAS

  constructor(){
    this.READ_tarefas();
  }
  
  //Criando um metodo CREATE TAREFAS

  CREATE_tarefa(descricaoNovaTarefa: string) {
    //método adicionado recebe como parâmetro somente a descrição da tarefa. Na sequência ele cria um novo objeto do tipo "Tarefa", utilizando a descrição recebida como parâmetro e define automaticamente o status "false". A última linha do método insere o objeto criado no arrayDeTarefas.
    var novaTarefa = new Tarefa(descricaoNovaTarefa, false);
    this.arrayDeTarefas.unshift(novaTarefa);
 }


  //O método READ_tarefas armazena 3 tarefas dentro do array
    READ_tarefas(){
    this.arrayDeTarefas=[
      new Tarefa("Joao Vitor Viana Alves - 216508", false),
      new Tarefa("Ariane Lacerda Castro - 215641", false),
      new Tarefa("Estudar Frameworks WEB", false),
      new Tarefa("Comer Pizza", false),
      new Tarefa("Ajudar meus pais", false),
      new Tarefa("Senha 28-02: 5284",false),
      new Tarefa("Senha 28-02: 5927",false),
    ];
  }
}


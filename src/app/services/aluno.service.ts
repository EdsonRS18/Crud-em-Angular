// Importa as dependências necessárias para criar o serviço
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// Importa o modelo Aluno que será usado pelo serviço
import {Aluno} from '../models/aluno';

// Importa as variáveis de ambiente

@Injectable()
export class alunoService {

  // Define a URL base da API de Alunos
  alunoApi = 'http://localhost:4000/alunos'

  // Cria uma instância do serviço HTTP do Angular
  constructor(private http: HttpClient) { }

  // Método para obter todos os alunos
  getAlunos(): Observable<Aluno[]> {
    // Realiza uma chamada HTTP GET para a URL da API de Alunos e retorna um Observable de Aluno[]
    return this.http.get<Aluno[]>(this.alunoApi);
  }

  // Método para criar um novo aluno
  createAluno(aluno: Aluno): Observable<Aluno> {

    // Realiza uma solicitação HTTP POST para a API de Alunos com o objeto Aluno como corpo da solicitação
    return this.http.post<Aluno>(this.alunoApi, aluno);

  }

  // Método para editar um aluno existente
  editAluno(aluno: Aluno): Observable<Aluno> {
    // Define a URL da API de Alunos para editar um aluno específico
    const url = `${this.alunoApi}/${aluno.id}`;
    // Realiza uma solicitação HTTP PUT para a URL da API de Alunos com o objeto Aluno como corpo da solicitação
    return this.http.put<Aluno>(url, aluno);
  }


  // Método para deletar um aluno existente
  deleteAluno(id: number) {
    // Define a URL da API de Alunos para deletar um aluno específico
    const url = `${this.alunoApi}/${id}`;
    // Realiza uma solicitação HTTP DELETE para a URL da API de Alunos
    return this.http.delete(url);
  }

}

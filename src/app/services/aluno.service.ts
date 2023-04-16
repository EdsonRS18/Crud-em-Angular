import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Aluno} from '../models/aluno';

@Injectable()
export class alunoService {

  alunoApi = 'http://localhost:4000/alunos'
  constructor(private http: HttpClient) { }

  getAlunos(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(this.alunoApi);
  }

  createAluno(aluno: Aluno): Observable<Aluno> {
    return this.http.post<Aluno>(this.alunoApi, aluno);

  }
  editAluno(aluno: Aluno): Observable<Aluno> {
    const url = `${this.alunoApi}/${aluno.id}`;
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

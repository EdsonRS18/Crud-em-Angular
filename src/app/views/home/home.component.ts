// Importação dos módulos do Angular necessários para a classe HomeComponent
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
// Importação do modelo de Aluno
import { Aluno } from 'src/app/models/aluno';
// Importação do componente de diálogo de aluno
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component'
// Importação do serviço de aluno
import { alunoService } from 'src/app/services/aluno.service';




@Component({
selector: 'app-home',
templateUrl: './home.component.html',
styleUrls: ['./home.component.scss'],
providers:[alunoService] // Registro do serviço de aluno
})

export class HomeComponent implements OnInit{

// Referência à tabela mat-table
@ViewChild(MatTable)
table!: MatTable<any>;
tabelaAluno: Aluno[] = [];
// Colunas exibidas na tabela
displayedColumns: string[] = ['nome', 'cpf', 'plano', 'actions'];

// Fonte de dados para a tabela



  constructor(
    public dialog: MatDialog, // Injeção do componente de diálogo
    public alunoService: alunoService // Injeção do serviço de aluno
  ){
  // Recuperação dos alunos do serviço
    this.alunoService.getAlunos()
      .subscribe((data:Aluno[])=>{
        this.tabelaAluno = data;
      })
    }

  ngOnInit(): void {
  // Método chamado após a inicialização do componente
  }

// Abre o diálogo de criação/edição de aluno
  openDialog(aluno: Aluno | null): void{

    // Criação do diálogo com configuração do tamanho e dados exibidos
    const dialogRef = this.dialog.open(ElementDialogComponent , {
    width: '250px',
    data: aluno === null ?{
    nome: '',
    cpf: null,
    plano: '',
    }:{
    id: aluno.id,
    nome: aluno.nome,
    cpf: aluno.cpf,
    plano: aluno.plano
    }
    })

    // Executa código após o fechamento do diálogo
    dialogRef.afterClosed().subscribe(result => {
    // Verifica se o resultado do diálogo é válido
      if (result !== undefined) {
        console.log(result);
    // Verifica se o aluno já existe no sistema
        if (this.tabelaAluno.map(p => p.id).includes(result.id)) {
          // Se o aluno já existe, atualiza os dados do aluno
          this.alunoService.editAluno(result)
          .subscribe((data: Aluno) => {
          const index = this.tabelaAluno.findIndex(p => p.id === data.id);
          this.tabelaAluno[index] = data;
          this.table.renderRows();
        });
      } else {
          // Se o aluno não existe, cria um novo aluno
          this.alunoService.createAluno(result)
          .subscribe((data: Aluno) => {
          this.tabelaAluno.push(data);
          this.table.renderRows();
          });
        }
      }
    });
  }

  // Função para editar um aluno
  editAluno(aluno: Aluno): void {
  this.openDialog(aluno);
  }

  // Função para deletar um aluno
  deleteAluno(id: number): void {
  this.alunoService.deleteAluno(id)
  .subscribe(() => {
  this.tabelaAluno = this.tabelaAluno.filter(p => p.id !== id);
  });
  }
}

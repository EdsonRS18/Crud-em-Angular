import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Aluno } from 'src/app/models/aluno';
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component'
import { alunoService } from 'src/app/services/aluno.service';

@Component({
selector: 'app-home',
templateUrl: './home.component.html',
styleUrls: ['./home.component.scss'],
providers:[alunoService]
})

export class HomeComponent implements OnInit{

@ViewChild(MatTable)
table!: MatTable<any>;
tabelaAluno: Aluno[] = [];//tabela
displayedColumns: string[] = ['nome', 'cpf', 'plano', 'actions'];//coluas

  constructor(
    public dialog: MatDialog, // Injeção do componente de diálogo
    public alunoService: alunoService // Injeção do serviço de aluno
  ){
    this.alunoService.getAlunos()
      .subscribe((data:Aluno[])=>{
        this.tabelaAluno = data;
      })
    }

  ngOnInit(): void {
  }


  openDialog(aluno: Aluno | null): void{

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

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        console.log(result);
        if (this.tabelaAluno.map(p => p.id).includes(result.id)) {
          this.alunoService.editAluno(result)
          .subscribe((data: Aluno) => {
          const index = this.tabelaAluno.findIndex(p => p.id === data.id);
          this.tabelaAluno[index] = data;
          this.table.renderRows();
        });
      } else {
          this.alunoService.createAluno(result)
          .subscribe((data: Aluno) => {
          this.tabelaAluno.push(data);
          this.table.renderRows();


          });
        }
      }
    });
  }


  editAluno(aluno: Aluno): void {
  this.openDialog(aluno);
  }


  deleteAluno(id: number): void {
  this.alunoService.deleteAluno(id)
  .subscribe(() => {
  this.tabelaAluno = this.tabelaAluno.filter(p => p.id !== id);
  });
  }
}

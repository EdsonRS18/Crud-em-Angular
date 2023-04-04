import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Aluno } from 'src/app/models/aluno';

@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./element-dialog.component.scss']
})
export class ElementDialogComponent implements OnInit {

  aluno!:Aluno;
  isChange!:boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { cpf: string | null, nome: string, plano: string },
    public dialogRef: MatDialogRef<ElementDialogComponent>,
  ) {}

  ngOnInit(): void {
    if (this.data.cpf != null) {
      this.isChange = true
    }


  }

  onCancel(): void {
    this.dialogRef.close();
  }

}

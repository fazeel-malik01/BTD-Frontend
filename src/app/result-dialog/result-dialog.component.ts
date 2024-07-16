import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
export interface ResultData {
  result: string;
  description: string;
  imageUrl: string | ArrayBuffer | null;
}
@Component({
  selector: 'app-result-dialog',
  standalone: true,
  imports: [
    CommonModule,
    HomeComponent
  ],
  templateUrl: './result-dialog.component.html',
  styleUrl: './result-dialog.component.scss'
})
export class ResultDialogComponent {
  results: string = 'Tumor Classification Result';
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,  public dialogRef: MatDialogRef<ResultDialogComponent>,) {

  }

  closeDialog() {
    this.dialogRef.close();
    window.location.reload();
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-splash',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './splash.component.html',
  styleUrl: './splash.component.scss'
})
export class SplashComponent {

}

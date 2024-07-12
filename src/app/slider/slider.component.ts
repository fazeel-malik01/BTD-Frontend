import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent {
  scrollPage() {
    window.scrollBy({
      top: 800, // Adjust the value to control the scroll distance
      behavior: 'smooth'
    });
  }
}

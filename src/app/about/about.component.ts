import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

interface TeamMember {
  name: string;
  position: string;
  description: string;
  avatarUrl: string;
  logoUrl: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    FooterComponent
],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  teamMembers: TeamMember[] = [
    {
      name: 'Muhammad Fazeel',
      position: 'Backend Developer',
      description: 'Using Django, I focus on training model for brain tumor detection and classification, aiming to improve detection accuracy through machine learning techniques.',
      avatarUrl: './assets/avatars/fazeel.jpeg',
      logoUrl: './assets/icons/uol-logo.png'
    },
    {
      name: 'Wajeeha Hasan',
      position: 'Frontend Developer',
      description: 'I build the frontend of the brain tumor detection application using Angular, focusing on creating a user-friendly interface for accurate and efficient diagnostics.',
      avatarUrl: './assets/avatars/wajeeha.jpeg',
      logoUrl: './assets/icons/uol-logo.png'
    },
    {
      name: 'Waleed Murad',
      position: 'Frontend Developer',
      description: 'I develop the frontend of the brain tumor detection system using Angular, ensuring a seamless user experience and effective interaction with the backend services.',
      avatarUrl: './assets/avatars/waleed.jpeg',
      logoUrl: './assets/icons/uol-logo.png'
    }
  ];
}

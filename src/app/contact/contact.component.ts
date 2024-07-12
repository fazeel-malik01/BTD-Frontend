import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser'
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    HeaderComponent,
    FooterComponent,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  contactForm: FormGroup | any;
  constructor(private fb: FormBuilder){
     this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      from_name: ['', [Validators.required]],
      to_name: ['BTD'],
      message: ['', [Validators.required]],
  })
}
async send() {
  if (this.contactForm.valid) {
    emailjs.init("yfBukQ5y-tTdE7CWi");
    let response = await emailjs.send("service_sg6vzm6", "template_5dko6pi", {
      from_name: this.contactForm.value.from_name,
      to_name: this.contactForm.value.to_name,
      email: this.contactForm.value.email,
      message: this.contactForm.value.message,
    });
    alert("Message has been sent");
    this.contactForm.reset();
    console.log(response)
  } else {
    alert("Please fill in all the required fields before submitting.");
  }
}
}

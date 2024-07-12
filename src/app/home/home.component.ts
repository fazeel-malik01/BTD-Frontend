import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SliderComponent } from '../slider/slider.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    HeaderComponent,
    FooterComponent,
    HttpClientModule,
    SliderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  previewImageUrl: string | ArrayBuffer | null = null;
  predictionResult: string = '';
  tumorDescriptions: { [key: string]: string } = {
    'glioma_tumor': 'Glioma tumors are malignant brain tumors that originate from glial cells.',
    'meningioma_tumor': 'Meningioma tumors are typically benign and originate from the meninges, the protective layers around the brain and spinal cord.',
    'no_tumor': 'No tumor detected. This indicates a normal brain scan with no signs of a tumor.',
    'pituitary_tumor': 'Pituitary tumors can be benign or malignant and originate from the pituitary gland at the base of the brain.'
  };
  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  previewImage(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.previewImageUrl = reader.result;
    };
    reader.readAsDataURL(file);
  }

  uploadImage(event: any) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    this.http.post<{ result: string }>('http://localhost:8000/predict/', formData)
      .subscribe(response => {
          console.log('Response from backend:', response); // Debugging
          this.predictionResult = response.result;
          this.cdr.detectChanges(); // Trigger change detection
          console.log('Updated predictionResult:', this.predictionResult); // Debugging
      }, error => {
          console.error('Error uploading image:', error);
      });
}

  clearPreview() {
    this.previewImageUrl = null;
    this.predictionResult = '';
  }

  // previewImageUrl: string | undefined;
  // constructor() {

  // }
 

  // previewImage(event: Event, previewId: string) {
  //   const inputElement = event.target as HTMLInputElement;
  //   if (inputElement.files && inputElement.files.length > 0) {
  //     const file = inputElement.files[0];
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.previewImageUrl = reader.result as string;
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  // clearPreview() {
  //   this.previewImageUrl = undefined;
  // }
}

import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SliderComponent } from '../slider/slider.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ResultData, ResultDialogComponent } from '../result-dialog/result-dialog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    HeaderComponent,
    FooterComponent,
    HttpClientModule,
    SliderComponent,
    MatDialogModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  imagePlaceholder: string = './assets/icons/placeholder-image.jpg'
  previewImageUrl: string | ArrayBuffer | null = null;
  predictionResult: string = '';
  tumorDescriptions: { [key: string]: string } = {
    'glioma_tumor': 'Glioma tumors are malignant brain tumors that originate from glial cells, which provide support and protection for neurons in the brain. These tumors can vary widely in their aggressiveness and treatment options. Treatment often involves a combination of surgery, radiation therapy, and chemotherapy. Gliomas can affect various parts of the brain, leading to symptoms such as headaches, seizures, and changes in cognitive function.',
    'meningioma_tumor': 'Meningioma tumors are typically benign and originate from the meninges, the protective layers surrounding the brain and spinal cord. While most meningiomas are non-cancerous, they can still cause symptoms depending on their size and location. Treatment may involve monitoring for growth, surgical removal, or in some cases, radiation therapy. Symptoms can include headaches, vision changes, and neurological deficits depending on the tumor location.',
    'no_tumor': '"No tumor detected" indicates a normal brain scan with no signs of a tumor. This result is reassuring, as it suggests that there are no abnormal growths or masses present in the brain. It is important to note that while no tumor is detected, other neurological conditions or issues may still be present and should be evaluated by a healthcare professional if symptoms persist.',
    'pituitary_tumor': 'Pituitary tumors can be benign (non-cancerous) or malignant (cancerous) and originate from the pituitary gland located at the base of the brain. These tumors can affect hormone production and regulation, leading to a variety of symptoms depending on whether they cause hormone overproduction or underproduction. Treatment options include medication to regulate hormone levels, surgery to remove the tumor, and sometimes radiation therapy. Symptoms may include headaches, vision problems, hormonal imbalances, and changes in appetite or weight.'
  };
  constructor(private http: HttpClient, private cdr: ChangeDetectorRef, private dialog: MatDialog) { }

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
        this.openResultDialog();
      }, error => {
        console.error('Error uploading image:', error);
      });
  }
  openResultDialog() {
    const description = this.tumorDescriptions[this.predictionResult] || '';
    const dialogData: ResultData = { result: this.predictionResult, description, imageUrl: this.previewImageUrl };
    this.dialog.open(ResultDialogComponent, {
      data: dialogData,
      width: '1000px',
      maxHeight: '90vh'
    });
  }


  clearPreview(input: HTMLInputElement) {
    this.previewImageUrl = null;
    this.predictionResult = '';
    input.value = '';
  }
}

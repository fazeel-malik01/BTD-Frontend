import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PredictService {

  private apiUrl = 'http://localhost:8000/predict/';

  constructor(private http: HttpClient) {}

  predict(formData: FormData): Observable<{ result: string }> {
    return this.http.post<{ result: string }>(this.apiUrl, formData);
  }
}

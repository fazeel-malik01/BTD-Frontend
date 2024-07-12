import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SplashComponent } from './splash/splash.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
    { path: 'uploads', component: HomeComponent },
    { path: '', component: SplashComponent },
    { path: 'contact', component: ContactComponent },
];

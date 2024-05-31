import { Component } from '@angular/core';
import {Router, RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    // Remplacer cette logique par une véritable authentification
    if (this.email === 'test@example.com' && this.password === 'password') {
      // Stocker l'état de l'utilisateur comme authentifié (localStorage, service, etc.)
      localStorage.setItem('isAuthenticated', 'true');
      // Rediriger vers l'application principale
      this.router.navigateByUrl('home');
    } else {
      alert('Identifiants invalides');
    }
  }
}

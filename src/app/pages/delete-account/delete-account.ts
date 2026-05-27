import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink } from 'firebase/auth';
import { auth } from '../../firebase.config';

const ACTION_CODE_SETTINGS = {
  url: 'https://www.tuprofeappmovil.com/delete-account',
  handleCodeInApp: true,
};

// Update after first deploy: firebase functions:list
const CONFIRM_URL =
  'https://us-central1-tuprofe-89d43.cloudfunctions.net/confirmAccountDeletion';

type PageState = 'form' | 'loading' | 'success' | 'confirming' | 'error';

@Component({
  selector: 'app-delete-account',
  imports: [FormsModule],
  templateUrl: './delete-account.html',
  styleUrl: './delete-account.scss',
})
export class DeleteAccountComponent implements OnInit {
  private http = inject(HttpClient);

  email = '';
  username = '';
  reason = '';

  state = signal<PageState>('form');
  errorMessage = signal<string>('');

  submitted    = computed(() => this.state() === 'success');
  isLoading    = computed(() => this.state() === 'loading');
  hasError     = computed(() => this.state() === 'error');
  isConfirming = computed(() => this.state() === 'confirming');

  ngOnInit(): void {
    if (!isSignInWithEmailLink(auth, window.location.href)) return;

    const savedEmail    = localStorage.getItem('deletionEmail')    ?? '';
    const savedUsername = localStorage.getItem('deletionUsername') ?? '';

    if (!savedEmail) {
      this.state.set('error');
      this.errorMessage.set('No se encontró el email asociado. Por favor, envía una nueva solicitud desde el mismo dispositivo.');
      return;
    }

    this.state.set('loading');

    signInWithEmailLink(auth, savedEmail, window.location.href)
      .then(result => result.user.getIdToken())
      .then(idToken =>
        this.http.post<{ success: boolean }>(
          CONFIRM_URL,
          { username: savedUsername },
          { headers: { Authorization: `Bearer ${idToken}` } }
        ).toPromise()
      )
      .then(() => {
        localStorage.removeItem('deletionEmail');
        localStorage.removeItem('deletionUsername');
        window.history.replaceState({}, '', '/delete-account');
        this.state.set('confirming');
      })
      .catch(() => {
        this.state.set('error');
        this.errorMessage.set('El link expiró, ya fue utilizado, o el nombre de usuario no coincide. Por favor, envía una nueva solicitud.');
      });
  }

  onSubmit(): void {
    if (!this.email || !this.username) return;

    this.state.set('loading');
    localStorage.setItem('deletionEmail',    this.email);
    localStorage.setItem('deletionUsername', this.username);

    sendSignInLinkToEmail(auth, this.email, ACTION_CODE_SETTINGS)
      .then(() => this.state.set('success'))
      .catch(() => {
        this.state.set('error');
        this.errorMessage.set('No se pudo enviar el email. Inténtalo más tarde.');
      });
  }

  resetForm(): void {
    this.email    = '';
    this.username = '';
    this.reason   = '';
    this.state.set('form');
    this.errorMessage.set('');
  }
}

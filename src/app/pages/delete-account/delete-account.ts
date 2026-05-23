import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-delete-account',
  imports: [FormsModule],
  templateUrl: './delete-account.html',
  styleUrl: './delete-account.scss',
})
export class DeleteAccountComponent {
  email = '';
  username = '';
  reason = '';
  submitted = signal(false);

  onSubmit() {
    if (this.email && this.username) {
      this.submitted.set(true);
    }
  }

  resetForm() {
    this.email = '';
    this.username = '';
    this.reason = '';
    this.submitted.set(false);
  }
}

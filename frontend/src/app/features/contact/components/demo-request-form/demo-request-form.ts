import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-demo-request-form',
  imports: [FormsModule],
  templateUrl: './demo-request-form.html',
  styleUrl: './demo-request-form.scss',
})
export class DemoRequestForm {
  fullName = '';
  email = '';
  company = '';
  interest = 'Product Demo';
  message = '';
  submitted = signal(false);

  submit(): void {
    if (!this.fullName || !this.email) {
      return;
    }
    this.submitted.set(true);
  }
}

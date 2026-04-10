import { Component, inject, signal, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Seo } from '../../../core/services/seo';
import { EXTERNAL_LOGIN_URL } from '../../../core/config/external-links';

export interface AppProduct {
  id: string;
  name: string;
  icon: string;
  tagline: string;
  color: string;
}

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly seo = inject(Seo);
  readonly externalLoginUrl = EXTERNAL_LOGIN_URL;

  step = signal<1 | 2>(1);
  selectedApp = signal<AppProduct | null>(null);
  submitted = signal(false);

  products: AppProduct[] = [
    { id: 'ai-bot', name: 'AI Bot',  icon: '🤖', tagline: 'Intelligent chatbot & automation',   color: '#6c63ff' },
    { id: 'erp',    name: 'ERP',     icon: '📊', tagline: 'Enterprise resource planning',        color: '#ff6b9d' },
    { id: 'sme',    name: 'SME',     icon: '🏢', tagline: 'Small & medium enterprise suite',     color: '#00d4aa' },
    { id: 'crm',    name: 'CRM',     icon: '💼', tagline: 'Customer relationship management',    color: '#ffa500' },
    { id: 'ums',    name: 'UMS',     icon: '👥', tagline: 'User management system',              color: '#00b4d8' },
    { id: 'dms',    name: 'DMS',     icon: '📁', tagline: 'Document management system',          color: '#a8e063' },
  ];

  form = this.fb.group(
    {
      application: [{ value: '', disabled: true }, Validators.required],
      fullName:   ['', [Validators.required, Validators.minLength(2)]],
      company:    ['', [Validators.required, Validators.minLength(2)]],
      email:      ['', [Validators.required, Validators.email]],
      phone:      ['', [Validators.pattern(/^[+\d\s\-()]{7,15}$/)]],
      password:   ['', [Validators.required, Validators.minLength(8)]],
      confirmPwd: ['', Validators.required],
      agree:      [false, Validators.requiredTrue],
    },
    { validators: this.passwordMatch }
  );

  private passwordMatch(group: AbstractControl): ValidationErrors | null {
    const pw  = group.get('password')?.value;
    const cpw = group.get('confirmPwd')?.value;
    return pw && cpw && pw !== cpw ? { passwordMismatch: true } : null;
  }

  ngOnInit() {
    this.seo.setPage(
      'Register | AI Solutions',
      'Create your account and choose the product that fits your business.',
      'register, sign up, ai bot, erp, crm, dms'
    );
  }

  selectApp(app: AppProduct) {
    this.selectedApp.set(app);
  }

  goToStep2() {
    if (!this.selectedApp()) return;
    this.form.get('application')!.setValue(this.selectedApp()!.id);
    this.step.set(2);
  }

  goBack() {
    this.step.set(1);
  }

  get f() { return this.form.controls; }

  onSubmit() {
    if (this.form.invalid || !this.selectedApp()) return;
    this.submitted.set(true);
  }
}


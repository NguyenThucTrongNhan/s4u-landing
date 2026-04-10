import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { EXTERNAL_LOGIN_URL } from '../../../core/config/external-links';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  readonly externalLoginUrl = EXTERNAL_LOGIN_URL;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      globalThis.location.assign(this.externalLoginUrl);
    }
  }
}

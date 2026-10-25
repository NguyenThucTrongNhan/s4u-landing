import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Seo } from '../../../core/services/seo';
@Component({selector: 'app-landing', imports: [RouterLink], templateUrl: './landing.html', styleUrl: './landing.scss'})
export class Landing implements OnInit {
  private seo = inject(Seo);
  ngOnInit() {
    this.seo.setPage('S4U | Giải pháp quản lý công việc và tài liệu', 'LawFirm và Document Platform: cùng doanh nghiệp xác định phạm vi demo và pilot cho công việc thực tế.');
    this.seo.setOrganizationSchema();
  }
}

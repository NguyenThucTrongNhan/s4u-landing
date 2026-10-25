import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Seo } from '../../../core/services/seo';
@Component({selector: 'app-about', imports: [RouterLink], templateUrl: './about.html', styleUrl: './about.scss'})
export class About { constructor() { inject(Seo).setPage('Giới thiệu | S4U', 'Cách S4U xây dựng giải pháp quản lý công việc và tài liệu.'); } }

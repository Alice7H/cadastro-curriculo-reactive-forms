import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-resume-informations',
  imports: [TitleCasePipe],
  templateUrl: './resume-informations.html',
})
export class ResumeInformations {
  private readonly _router = inject(Router);

  personalData: any = {};
  professionalData: any[] = [1];

  newCurriculum() {
    this._router.navigate(['/']);
  }
}

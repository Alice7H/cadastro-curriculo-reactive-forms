import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CurriculumFormStore } from '../../../../core/services/curriculum-form-store';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-step-personal',
  imports: [ReactiveFormsModule],
  templateUrl: './step-personal.html',
})
export class StepPersonal {
  readonly curriculumFormStore = inject(CurriculumFormStore);
  readonly router = inject(Router)
  
  ngOnInit(){
    console.log('Personal group ', this.curriculumFormStore.personalFormGroup)
  }

  goToProfessional(){
    console.log('Personal value: ', this.curriculumFormStore.personalFormGroup.value)
    this.router.navigate(['/professional']);
  }
}

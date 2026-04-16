import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurriculumFormStore } from '../../../../core/services/curriculum-form-store';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-step-personal',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './step-personal.html',
})
export class StepPersonal {
  readonly curriculumFormStore = inject(CurriculumFormStore);
  
  ngOnInit(){
    console.log('Personal group ', this.curriculumFormStore.personalFormGroup)
  }

  logPersonal(){
    console.log('Personal value: ', this.curriculumFormStore.personalFormGroup.value)
  }
}

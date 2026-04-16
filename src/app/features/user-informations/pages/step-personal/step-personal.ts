import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CurriculumFormStore } from '../../../../core/services/curriculum-form-store';
import { ReactiveFormsModule } from '@angular/forms';
import { StatesAndCitiesApi } from '../../../../core/services/states-and-cities-api';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-step-personal',
  imports: [ReactiveFormsModule],
  templateUrl: './step-personal.html',
})
export class StepPersonal {
  readonly curriculumFormStore = inject(CurriculumFormStore);
  private readonly _statesAndCitiesApi = inject(StatesAndCitiesApi);
  private readonly _router = inject(Router)
  
  statesResource = rxResource({
    params: () => true,
    stream: () => this._statesAndCitiesApi.getStates(),
  });

  statesList = computed(()=> {
    const ERROR_ON_RESPONSE = !!this.statesResource.error();
    if(ERROR_ON_RESPONSE) return [];
    return this.statesResource.value() ?? [];
  })

  ngOnInit(){
    console.log('Personal group ', this.curriculumFormStore.personalFormGroup)
  }

  goToProfessional(){
    console.log('Personal value: ', this.curriculumFormStore.personalFormGroup.value)
    this._router.navigate(['/professional']);
  }
}

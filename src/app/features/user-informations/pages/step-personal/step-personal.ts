import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CurriculumFormStore } from '../../../../core/services/curriculum-form-store';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StatesAndCitiesApi } from '../../../../core/services/states-and-cities-api';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-step-personal',
  imports: [ReactiveFormsModule],
  templateUrl: './step-personal.html',
})
export class StepPersonal {
  readonly curriculumFormStore = inject(CurriculumFormStore);
  private readonly _statesAndCitiesApi = inject(StatesAndCitiesApi);
  private readonly _router = inject(Router)
  
  get stateControl() {
    return this.curriculumFormStore.personalFormGroup.get('state') as FormControl;
  }

  stateSelected = toSignal<string>( this.stateControl!.valueChanges,{ initialValue: this.stateControl!.value || ''
  });

  testState = computed(() => {
    console.log('Estado selecionado: ', this.stateSelected())
    return '';
  })

  statesResource = rxResource({
    params: () => true,
    stream: () => this._statesAndCitiesApi.getStates(),
  });

  statesList = computed(()=> {
    const ERROR_ON_RESPONSE = !!this.statesResource.error();
    if(ERROR_ON_RESPONSE) return [];
    return this.statesResource.value() ?? [];
  })

  goToProfessional(){
    console.log('Personal value: ', this.curriculumFormStore.personalFormGroup.value)
    this._router.navigate(['/professional']);
  }
}

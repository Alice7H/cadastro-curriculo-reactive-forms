import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-step-professional',
  imports: [RouterLink],
  templateUrl: './step-professional.html',
})
export class StepProfessional {
  experiences = signal<{ id: number }[]>([{ id: Date.now() }]);

  addExperience() {
    this.experiences.update((list) => [...list, { id: Date.now() }]);
  }

  removeExperience(id: number) {
    this.experiences.update((list) => list.filter((item) => item.id !== id));
  }

  submit() {
    alert('🚀 Currículo enviado para a órbita!');
  }
}

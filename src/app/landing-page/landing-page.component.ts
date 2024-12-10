import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

  userEmail!: string;
  userPassword!: string;

  constructor(private router: Router) {
  }

  onSubmitForm(form: NgForm): void {
    console.log(form.value);
  }
  onContinue() {
    this.router.navigateByUrl('/facesnaps');
  }
}

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Landing } from '../../components/landing/landing';

@Component({
  selector: 'app-landing-layout',
  imports: [RouterModule, Landing],
  templateUrl: './landing-layout.html',
  styleUrl: './landing-layout.css',
})
export class LandingLayout {

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  imports: [],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class LandingComponent {
  readonly androidUrl = /android/i.test(navigator.userAgent)
    ? 'https://play.google.com/store/apps/details?id=com.angarita.tuprofe'
    : 'https://play.google.com/apps/testing/com.angarita.tuprofe';
}

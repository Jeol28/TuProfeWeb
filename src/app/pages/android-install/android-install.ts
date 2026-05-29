import { Component } from '@angular/core';

@Component({
  selector: 'app-android-install',
  imports: [],
  templateUrl: './android-install.html',
  styleUrl: './android-install.scss',
})
export class AndroidInstallComponent {
  readonly isAndroid = /android/i.test(navigator.userAgent);
  readonly groupUrl = 'https://groups.google.com/g/tuprofe?pli=1';
  readonly playStoreUrl = this.isAndroid
    ? 'https://play.google.com/store/apps/details?id=com.angarita.tuprofe'
    : 'https://play.google.com/apps/testing/com.angarita.tuprofe';
}

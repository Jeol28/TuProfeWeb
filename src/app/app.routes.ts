import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy';
import { TermsComponent } from './pages/terms/terms';
import { DeleteAccountComponent } from './pages/delete-account/delete-account';
import { CsaeStandardsComponent } from './pages/csae-standards/csae-standards';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'delete-account', component: DeleteAccountComponent },
  { path: 'csae-standards', component: CsaeStandardsComponent },
  { path: '**', redirectTo: '' }
];

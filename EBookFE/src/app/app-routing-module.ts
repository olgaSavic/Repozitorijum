import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NaucnaOblastComponent} from './naucna-oblast/naucna-oblast.component';
import {FinishPageComponent} from './finish-page/finish-page.component';
import {LoginComponent} from './login/login.component';
import {EmailComponent} from './email/email.component';
import {AfterEmailComponent} from './after-email/after-email.component';
import {LoginAdminComponent} from './login-admin/login-admin.component';
import {FinishPageRecenzentComponent} from './finish-page-recenzent/finish-page-recenzent.component';
import {PotvrdaAdminComponent} from './potvrda-admin/potvrda-admin.component';
import {RecencentAdminComponent} from './recencent-admin/recencent-admin.component';
import {KreiranjeCasopisaComponent} from './kreiranje-casopisa/kreiranje-casopisa.component';
import {NaucnaOblastCasopisComponent} from './naucna-oblast-casopis/naucna-oblast-casopis.component';
import {UredniciRecenzentiComponent} from './urednici-recenzenti/urednici-recenzenti.component';
import {LoginAdminCasopisComponent} from './login-admin-casopis/login-admin-casopis.component';
import {AktivacijaCasopisAdminComponent} from './aktivacija-casopis-admin/aktivacija-casopis-admin.component';
import {FinishPageCasopisComponent} from './finish-page-casopis/finish-page-casopis.component';
import {AZapocniObraduComponent} from './a-zapocni-obradu/a-zapocni-obradu.component';

const routes: Routes = [

  { path: 'naucnaOblast/:processInstanceId', component: NaucnaOblastComponent },
  { path: 'finishPage', component: FinishPageComponent },
  { path: 'finishPageRecenzent', component: FinishPageRecenzentComponent },
  { path: 'login', component: LoginComponent },
  { path: 'loginAdmin/:processInstanceId', component: LoginAdminComponent },
  { path: 'email/:processInstanceId', component: EmailComponent },
  { path: 'afterEmail/:email/:processInstanceId', component: AfterEmailComponent},
  { path: 'novaPotvrdaAdmin/:processInstanceId', component: PotvrdaAdminComponent },
  { path: 'recAdmin/:processInstanceId', component: RecencentAdminComponent },

  { path: 'kreiranjeCasopisa', component: KreiranjeCasopisaComponent},
  { path: 'naucnaOblastCasopis/:processInstanceId', component: NaucnaOblastCasopisComponent },
  { path: 'uredRec/:processInstanceId', component: UredniciRecenzentiComponent },
  { path: 'loginAdminCasopis/:processInstanceId', component: LoginAdminCasopisComponent },
  { path: 'aktivacijaCasAdmin/:processInstanceId', component: AktivacijaCasopisAdminComponent },
  { path: 'finishPageCasopis', component: FinishPageCasopisComponent },

  // KT 4 = ODBRANA
  { path: 'zapocniObradu', component: AZapocniObraduComponent }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true}), FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../services/users/user.service';
import {NaucnaOblastService} from '../services/naucna-oblast/naucna-oblast.service';
import {RepositoryService} from '../services/repository/repository.service';
import {ObradaService} from '../services/obrada/obrada.service';


@Component({
  selector: 'app-a-izbor-casopisa',
  templateUrl: './a-izbor-casopisa.component.html',
  styleUrls: ['./a-izbor-casopisa.component.css']
})
export class AIzborCasopisaComponent implements OnInit {

  private formFieldsDto = null;
  private formFields = [];
  private processId = '';
  private username = '';
  private reviewers = [];
  private editors = [];
  private processInstance: any ;

  private casopisi = [];
  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute,
              protected router: Router,
              private userService: UserService,
              private casopisService: NaucnaOblastService,
              private repositoryService: RepositoryService,
              private obradaService: ObradaService) {

    const processInstanceId = this.route.snapshot.params.processInstanceId ;
    this.processInstance = processInstanceId;

    const x = obradaService.sledeciTaskIzbor(processInstanceId);
    x.subscribe(
      res => {
        console.log(res);
        this.formFieldsDto = res;
        this.formFields = res.formFields;
        console.log(this.formFields);

        this.obradaService.getAllCasopisi().subscribe(
          pom => {
            console.log('Ispis casopisa');
            console.log(pom);
            this.casopisi = pom;
          }
        );


      },
      err => {
        console.log('Error occured');
      }
    );

  }

  ngOnInit() {
  }


  onSubmit(value, form) {
    console.log(form);
    console.log(value);
    const o = new Array();

    // tslint:disable-next-line:forin
    for (const property in value) {

      if (property != 'casopisiL') {
        o.push({fieldId : property, fieldValue : value[property]});
      } else {
        o.push({fieldId : property, categories : value[property]});

      }
      console.log(o);
    }

    let x = this.obradaService.sacuvajIzabranCasopis(o, this.formFieldsDto.taskId);
    console.log('Pre subscribe');
    x.subscribe(
      res => {
        console.log(res);
        alert('Izvrsen je uspesan izbor casopisa!');
        this.router.navigateByUrl('unosInfoRad/' + this.processInstance);
      },
      err => {
        console.log('Error occured');
      }
    );
  }

}
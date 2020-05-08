import {Component, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {RequestService} from '../request.service';
import {Subject} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  constructor(private requestService: RequestService,  private route: Router) { }
  username: any;
  email: any;
  password: any;
  phone: any;
  newUser: any;
  unsub$ = new Subject();
  myForm: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    userEmail: new FormControl('', [
      Validators.required,
      // tslint:disable-next-line:max-line-length
      Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, )], ),
    userPass: new FormControl('', Validators.required),
    userPhone: new FormControl('', Validators.pattern('[0-9]{10}'))
  });
  ngOnInit() {
  }
  register() {
    this.requestService.Registration(this.username, this.password, this.email, this.phone)
      .pipe(takeUntil(this.unsub$)).subscribe((data: any) => {
      this.newUser = data;
      this.route.navigate(['/main']);
    });
  }
  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }
}

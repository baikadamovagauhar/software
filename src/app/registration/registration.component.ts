import {Component, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {RequestService} from '../request.service';
import {Subject} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  constructor(private requestService: RequestService) { }
  username: any;
  email: any;
  password: any;
  phone: any;
  newUser: any;
  unsub$ = new Subject();
  myForm: FormGroup = new FormGroup({
    userName: new FormControl('Tom', Validators.required),
    userEmail: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    userPass: new FormControl('', Validators.required),
    userPhone: new FormControl('', Validators.pattern('[0-9]{10}'))
  });
  ngOnInit() {
  }
  register() {
    this.requestService.Registration(this.username, this.password, this.email, this.phone)
      .pipe(takeUntil(this.unsub$)).subscribe((data: any) => {
      this.newUser = data;
      console.log(this.newUser);
    });
  }
  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }
}

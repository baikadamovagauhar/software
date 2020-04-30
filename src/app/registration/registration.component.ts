import { Component, OnInit } from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {RequestService} from '../request.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private requestService: RequestService) { }
  username: any;
  email: any;
  password: any;
  phone: any;
  ngOnInit() {
  }
  register() {
    this.requestService.Registration(this.username, this.password, this.email, this.phone);
  }

}

import {Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ILoginForm} from '../../Models/Authentication/ILoginForm';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  @Output() loginChange = new EventEmitter<ILoginForm>();

  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = fb.group({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  Login(): void {
    if (this.loginForm.valid) {
      this.loginChange.emit({
        email: this.loginForm.get('username').value,
        password: this.loginForm.get('password').value
      });
    }
  }

}

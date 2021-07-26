import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pr-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loginCtrl: FormControl;
  passwordCtrl: FormControl;
  confirmPasswordCtrl: FormControl;
  birthYearCtrl: FormControl;
  passwordForm: FormGroup;
  userForm: FormGroup;
  registrationFailed: boolean;

  static passwordMatch(group: AbstractControl): { matchingError: true } | null {
    const password = group.get('password')!.value;
    const confirm = group.get('confirmPassword')!.value;
    return password == confirm ? null : { matchingError: true };
  }

  constructor(fb: FormBuilder, private userService: UserService, private router: Router) {
    this.loginCtrl = fb.control('', [Validators.required, Validators.minLength(3)]);
    this.passwordCtrl = fb.control('', Validators.required);
    this.confirmPasswordCtrl = fb.control('', Validators.required);
    this.passwordForm = fb.group(
      {
        password: this.passwordCtrl,
        confirmPassword: this.confirmPasswordCtrl
      },
      {
        validators: RegisterComponent.passwordMatch
      }
    );
    this.birthYearCtrl = fb.control('', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]);
    this.userForm = fb.group({
      login: this.loginCtrl,
      passwordForm: this.passwordForm,
      birthYear: this.birthYearCtrl
    });
    this.registrationFailed = false;
  }

  ngOnInit(): void {
    console.log('register init');
  }

  register(): void {
    const {
      login,
      passwordForm: { password },
      birthYear
    } = this.userForm.value;
    this.userService.register(login, password, birthYear).subscribe({
      next: user => this.router.navigate(['/']),
      error: _ => (this.registrationFailed = true)
    });
  }
}

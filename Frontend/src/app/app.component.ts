import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-first-project';
  searchForm: FormGroup;
  httpCall: boolean = false;
  data: [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
  ) {
    this.searchForm = this.fb.group({
      gpa: ['', [Validators.required]],
      grescore: ['', Validators.required],
      country: ['', [Validators.required]],
      coursename: ['']
    });
  }

  onSubmit() {

    if (this.searchForm.invalid) {
      Object.keys(this.searchForm.controls).forEach((formControl: any) => {
        this.searchForm.controls[formControl].markAsDirty();
      })
    } else {
      this.httpCall = true;
      this.auth.search(this.searchForm.value).subscribe(res => {
        this.httpCall = false;
        if (res.code == 200) {
         this.data = res.data;
        } 
      });
    }


  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


export interface Test {
  name: string,
  id: number
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})

export class TestComponent implements OnInit {
  myControl = new FormControl();
  options: Test[] = [ 
    {name: 'One', id: 1},
    {name: 'Two', id: 2},
    {name: 'Three', id: 3},
  ];
  filteredOptions?: Observable<Test[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      // .pipe(
      //   startWith(''),
      //   map(value => this._filter(value))
      // );
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
    console.log(this.filteredOptions)
  }

  constructor(private fb: FormBuilder){
    console.log(this.myControl)
  }

  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: [''],
    address: this.fb.group({
      district: [''],
      province: [''],
    }),
  });

  displayFn(user: Test): string {
    return user && user.name ? user.name : '';
  }

  //2 cach de lay gia tri trong autocomplete
  select(option: Test){
    console.log(option)
  }

  OnHumanSelected(option: any) {
    console.log(typeof(option))
    console.log(option.option.value);
}

  private _filter(value: string): Test[] {
    console.log(this.filteredOptions)

    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue)) as Test[];
  }

  email = new FormControl('', [Validators.required, Validators.email, Validators.minLength(5)]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    var a = ''

    if (this.email.hasError('minlength')) {
      a+= '5 min'
    }

    return a + this.email.hasError('email') ? '\nNot a valid email' : '';
  }

  // profileForm = new FormGroup({
  //   firstName: new FormControl(''),
  //   lastName: new FormControl(''),
  //   address: new FormGroup({
  //     district: new FormControl(''),
  //     province: new FormControl(''),
  //   })
  // })

  onSubmit(){
    console.log(this.profileForm)
    this.profileForm.patchValue({
      firstName: 'a'
    })
  }

}

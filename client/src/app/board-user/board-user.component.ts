import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import { UserService } from '../_services/user.service';


@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {

  // content?: string;
  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: any;
  isLoading = false;
  errorMsg: string
  selectedLat: string
  selectedLng: string

  constructor(private userService: UserService,
              private http: HttpClient) { }

  ngOnInit(): void {
    // this.userService.getUserBoard().subscribe(
    //   data => {
    //     this.content = data;
    //   },
    //   err => {
    //     this.content = JSON.parse(err.error).message;
    //   }
    // );
    this.myControl.valueChanges
    .pipe(
      debounceTime(500),
      tap(() => {
        this.errorMsg = ""
        this.filteredOptions = []
        this.isLoading = true
      }),
      switchMap(value => this.userService.getUserBoard(value))
    )
    .subscribe(data => {
      if (data['results'] == undefined) {
        this.errorMsg = 'No response from API'
        this.filteredOptions = []
      } else {
        this.errorMsg = ''
        this.filteredOptions = data['results']
      }
      
      // console.log(this.filteredOptions)
      this.selectedLat = this.filteredOptions[0].LATITUDE
      this.selectedLng = this.filteredOptions[0].LONGITUDE
      // console.log('Lat', this.selectedLat)
      // console.log('Lng', this.selectedLng)
    })
  }

}
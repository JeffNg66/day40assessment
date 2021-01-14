import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import { AddrPicked, UserService } from '../_services/user.service';


@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {

  content?: string;
  myControl = new FormControl('');
  filteredOptions: any;
  isLogin = false;
  errorMsg: string

  constructor(private userService: UserService,
    private http: HttpClient) { }

  userSelectAddr: AddrPicked = {
    lat: 1.29795856720987,
    lng: 103.787435440348
  }

  ngOnInit(): void {
    this.userService.getUserBoard().subscribe(
      data => {
        // this.content = data;
        this.oneMapSearch()
        this.isLogin = true
      },
      err => {
        this.content = JSON.parse(err.error).message;
        this.isLogin = false
      }
    );

  }

  oneMapSearch() {
    this.myControl.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.errorMsg = ""
          this.filteredOptions = []
          // this.isLoading = true
        }),
        switchMap(value => this.userService.getOneMap(value))
      )
      .subscribe(data => {
        if ((data['results'] == undefined) || (data['results'].length == 0)) {
          this.errorMsg = 'No response from API'
          this.filteredOptions = []
        } else {
          this.errorMsg = ''
          this.filteredOptions = data['results']
        }

      })
  }
  
  onClick(i) {
    // console.log('clicked')
    this.userSelectAddr = {
      lat: parseFloat(this.filteredOptions[i].LATITUDE),
      lng: parseFloat(this.filteredOptions[i].LONGITUDE)
    }
  }
}
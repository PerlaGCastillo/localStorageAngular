import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  isNewUser: boolean = false
  userObj: User = new User();
  localKey: string = "angular19user"
  userList: User[] = []

  ngOnInit(): void {
    debugger
    const localData = localStorage.getItem(this.localKey)
    if(localData != null){
      this.userList = JSON.parse(localData)
    }
  }

  changeView(){
    this.isNewUser = !this.isNewUser
  }

  onEdit(data: User){
    this.userObj = data
    this.changeView()
  }

  onDelete(userId: number){
    const isDelete = confirm("Do you want to delete?")
    if(isDelete){
      const index = this.userList.findIndex(m=>m.userId == userId)
      this.userList.splice(index,1)
      this.storeData()    }
  }

  onUpdate(){
    const record= this.userList.find(m=>m.userId == this.userObj.userId)
    if(record != undefined) {
      record.city = this.userObj.city
      record.fName = this.userObj.fName
    }
    this.storeData()
    this.changeView()
  }

  storeData(){
    localStorage.setItem(this.localKey,JSON.stringify(this.userList))
  }

  onSave(){
    debugger
    this.userObj.userId = this.userList.length +1;
    this.userList.push(this.userObj)
    this.userObj = new User()
    this.storeData()
    this.changeView()
  }

}

class User {
  userId: number;
  fName: string;
  lName: string;
  uName: string;
  city: string;
  state: string;
  zipCode: string;
  isAggree: boolean;

  constructor() {
    this.userId = 0;
    this.fName = "";
    this.lName = "";
    this.uName = "";
    this.city = "";
    this.state = "";
    this.zipCode = "";
    this.isAggree = false;
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn(): boolean {
    if(localStorage.getItem('isLoggedIn')=="true"){
      return true
    }else{
    return false}
  }

  setDataToStorage(data){
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('firstName',data.firstName);
    localStorage.setItem('lastName',data.lastName);
  }

getUserName(){
  let userName=`${localStorage.getItem('firstName')} ${localStorage.getItem('lastName')}`;
  debugger;
  return userName;
}

clearStorage(){
  localStorage.clear();
  sessionStorage.clear();
}

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/Services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  userName:string;
  constructor(private _router: Router, private _auth: AuthService) { }

  ngOnInit(): void {
    this.userName=this._auth.getUserName();
    debugger;
   }

  logout() {
    this._auth.clearStorage();
    this._router.navigate(['login']);
  }
}

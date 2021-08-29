import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-error',
  templateUrl: './display-error.component.html',
  styleUrls: ['./display-error.component.sass']
})
export class DisplayErrorComponent {
  @Input() errorMsg: string;
  @Input() displayError: boolean;

}

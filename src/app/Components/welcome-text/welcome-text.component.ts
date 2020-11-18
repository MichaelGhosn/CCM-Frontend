import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome-text',
  templateUrl: './welcome-text.component.html',
  styleUrls: ['./welcome-text.component.scss']
})
export class WelcomeTextComponent implements OnInit {

  text = {
    title: 'Company Corona Management',
    description: 'When even a global pandemic can\'t stop us from going to work'
  };

  constructor() { }

  ngOnInit(): void {
  }

}

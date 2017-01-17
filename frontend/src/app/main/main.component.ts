import { Component, OnInit,  trigger, state, style, transition, animate } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    trigger('sidebar', [
      state('show', style({
        left: '0'
      })),
      state('hide', style({
        left: '-70vw'
      })),
      transition('show => hide', animate('400ms ease-in-out')),
      transition('hide => show', animate('400ms ease-in-out'))
    ]),
    trigger('page', [
      state('show', style({

      })),
      state('hide', style({
        left: '0'
      })),
      transition('show => hide', animate('400ms ease-in-out')),
      transition('hide => show', animate('400ms ease-in-out'))
    ])
  ]
})
export class MainComponent implements OnInit {
  showSidebar = 'show'
  constructor() { }

  ngOnInit() {
    if(window.screen.width <= 724) {
      this.toggleSidebar();
    }

  }

  toggleSidebar() {
    this.showSidebar = this.showSidebar === 'hide' ? 'show' : 'hide';
  }

}

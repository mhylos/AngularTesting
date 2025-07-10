import { Component, Input, OnInit } from '@angular/core';
import {
  IonIcon,
  IonItemOption,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  imports: [IonTabButton, IonTabs, IonIcon, IonTabBar, IonLabel],
})
export class TabsComponent implements OnInit {
  @Input() appPages!: { title: string; url: string; icon: string }[];
  constructor() {}

  ngOnInit() {}
}

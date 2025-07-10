import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  IonApp,
  IonSplitPane,
  IonMenu,
  IonContent,
  IonList,
  IonListHeader,
  IonNote,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonRouterLink,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  peopleOutline,
  peopleSharp,
  shieldOutline,
  shieldSharp,
  businessOutline,
  businessSharp,
  alertCircleOutline,
  alertCircleSharp,
  hardwareChipOutline,
  hardwareChipSharp,
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [
    RouterLink,
    RouterLinkActive,
    IonApp,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonList,
    IonListHeader,
    IonNote,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonLabel,
    IonRouterLink,
    IonRouterOutlet,
  ],
})
export class AppComponent {
  public appPages = [
    { title: 'Usuarios', url: '/usuarios', icon: 'people' },
    { title: 'Accesos', url: '/accesos', icon: 'shield' },
    { title: 'Recintos', url: '/recintos', icon: 'business' },
    { title: 'Alertas', url: '/alertas', icon: 'alert-circle' },
    { title: 'Dispositivos', url: '/dispositivos', icon: 'hardware-chip' },
  ];
  constructor() {
    addIcons({
      peopleOutline,
      peopleSharp,
      shieldOutline,
      shieldSharp,
      businessOutline,
      businessSharp,
      alertCircleOutline,
      alertCircleSharp,
      hardwareChipOutline,
      hardwareChipSharp,
    });
  }
}

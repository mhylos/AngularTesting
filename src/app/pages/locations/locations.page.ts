import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { RouterOutlet } from '@angular/router';
import { addIcons } from 'ionicons';
import { addOutline, addSharp } from 'ionicons/icons';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.page.html',
  styleUrls: ['./locations.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    RouterOutlet,
    CommonModule,
    FormsModule,
  ],
})
export class LocationsPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}

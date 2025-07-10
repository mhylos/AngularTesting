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
  selector: 'app-places',
  templateUrl: './places.page.html',
  styleUrls: ['./places.page.scss'],
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
export class PlacesPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}

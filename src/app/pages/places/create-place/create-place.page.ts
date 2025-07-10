import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CreatePlaceFormComponent } from 'src/app/features/places/components/create-place-form/create-place-form.component';

@Component({
  selector: 'app-create-place',
  templateUrl: './create-place.page.html',
  styleUrls: ['./create-place.page.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, IonicModule, CreatePlaceFormComponent],
})
export class CreatePlacePage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  onPlaceCreated() {
    this.router.navigate(['/recintos']);
  }
}

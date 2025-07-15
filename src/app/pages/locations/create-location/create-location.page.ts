import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CreateLocationFormComponent } from '@/features/locations/components/create-location-form/create-location-form.component';

@Component({
  selector: 'app-create-location',
  templateUrl: './create-location.page.html',
  styleUrls: ['./create-location.page.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, IonicModule, CreateLocationFormComponent],
})
export class CreateLocationPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  onLocationCreated() {
    this.router.navigate(['/ubicaciones']);
  }
}

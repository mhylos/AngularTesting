import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditLocationFormComponent } from '@/features/locations/components/edit-location-form/edit-location-form.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.page.html',
  styleUrls: ['./edit-location.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, EditLocationFormComponent],
})
export class EditLocationPage implements OnInit {
  locationId: number | null = null;
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    try {
      this.locationId = Number(this.route.snapshot.paramMap.get('id'));
      if (isNaN(this.locationId)) {
        throw new Error('Invalid location ID');
      }
    } catch (error) {
      console.error('Error obteniendo el ID de la ubicación:', error);
      this.locationId = null;
    }
  }

  onLocationUpdated() {
    this.router.navigate(['/ubicaciones']);
  }
}

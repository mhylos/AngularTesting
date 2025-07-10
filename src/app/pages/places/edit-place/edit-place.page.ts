import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditPlaceFormComponent } from 'src/app/features/places/components/edit-place-form/edit-place-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-place',
  templateUrl: './edit-place.page.html',
  styleUrls: ['./edit-place.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, EditPlaceFormComponent],
})
export class EditPlacePage implements OnInit {
  placeId: number | null = null;
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    try {
      this.placeId = Number(this.route.snapshot.paramMap.get('id'));
      if (isNaN(this.placeId)) {
        throw new Error('Invalid place ID');
      }
    } catch (error) {
      console.error('Error obteniendo el recinto ID:', error);
      this.placeId = null;
    }
  }

  onPlaceUpdated() {
    this.router.navigate(['/recintos']);
  }
}

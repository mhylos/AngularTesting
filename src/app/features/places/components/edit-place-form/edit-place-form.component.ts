import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LocationService } from 'src/app/features/locations/services/location.service';
import { SearchableSelectComponent } from 'src/app/shared/components/searchable-select/searchable-select/searchable-select.component';
import { Place, PlaceUpdateRequest } from '../../models/place.model';
import { PlaceService } from '../../services/place.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-place-form',
  standalone: true,
  imports: [ReactiveFormsModule, IonicModule, SearchableSelectComponent],
  templateUrl: './edit-place-form.component.html',
})
export class EditPlaceFormComponent implements OnInit {
  @Input({ required: true }) placeId!: Place['id'];
  @Output() onPlaceUpdated = new EventEmitter<Place>();

  private isLoadingSignal = signal(false);

  placeService = inject(PlaceService);
  placeForm: FormGroup;

  locationQuery = signal<string>('');
  locationsService = inject(LocationService);
  locationsData = rxResource({
    params: () => ({ query: this.locationQuery() }),
    stream: ({ params }) => this.locationsService.getLocations(params.query),
  });

  constructor(private fb: FormBuilder, private router: Router) {
    this.placeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      location: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    this.isLoadingSignal.set(true);
    this.placeService.getPlaceById(this.placeId).subscribe({
      next: (place) => {
        this.placeForm.patchValue({
          name: place.name,
          location: place.location,
        });
      },
      error: (error) => {
        console.error('Error:', error);
        this.isLoadingSignal.set(false);
        this.router.navigate(['/recintos']);
      },
      complete: () => {
        this.isLoadingSignal.set(false);
      },
    });
  }

  isLoading() {
    return this.isLoadingSignal() || this.locationsData.isLoading();
  }

  onSubmit() {
    this.isLoadingSignal.set(true);
    if (this.placeForm.valid) {
      const formValue = this.placeForm.value;
      const placeData: PlaceUpdateRequest = {
        name: formValue.name,
        locationId: formValue.location.id,
      };

      this.placeService.updatePlace(this.placeId, placeData).subscribe({
        next: (place: Place) => {
          this.onPlaceUpdated.emit(place);
        },
        error: (error) => {
          console.error('Error:', error);
        },
        complete: () => {
          this.isLoadingSignal.set(false);
        },
      });
    }
  }

  onSearchInput(event: string) {
    this.locationQuery.set(event);
  }
}

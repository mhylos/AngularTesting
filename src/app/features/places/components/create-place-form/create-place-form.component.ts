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
  ControlContainer,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LocationService } from 'src/app/features/locations/services/location.service';
import { SearchableSelectComponent } from 'src/app/shared/components/searchable-select/searchable-select/searchable-select.component';
import {
  Place,
  PlaceCreateRequest,
  PlaceFormFields,
} from '../../models/place.model';
import { PlaceService } from '../../services/place.service';

@Component({
  selector: 'app-place-form',
  standalone: true,
  imports: [ReactiveFormsModule, IonicModule, SearchableSelectComponent],
  templateUrl: './create-place-form.component.html',
})
export class CreatePlaceFormComponent implements OnInit {
  @Output() onPlaceCreated = new EventEmitter<Place>();
  isLoading = signal(false);

  placeService = inject(PlaceService);
  placeForm: FormGroup;

  locationQuery = signal<string>('');
  locationsService = inject(LocationService);
  locationsData = rxResource({
    params: () => ({ query: this.locationQuery() }),
    stream: ({ params }) => this.locationsService.getLocations(params.query),
  });

  constructor(private fb: FormBuilder) {
    this.placeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      location: [null, [Validators.required]],
    });
  }

  ngOnInit() {}

  onSubmit() {
    this.isLoading.set(true);
    if (this.placeForm.valid) {
      const formValue = this.placeForm.value;
      const placeData: PlaceCreateRequest = {
        name: formValue.name,
        locationId: formValue.location.id,
      };

      this.placeService.createPlace(placeData).subscribe({
        next: (place: Place) => {
          this.onPlaceCreated.emit(place);
        },
        error: (error) => {
          console.error('Error:', error);
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });
    }
  }

  onSearchInput(event: string) {
    this.locationQuery.set(event);
  }
}

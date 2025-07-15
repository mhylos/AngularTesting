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
import { Location, LocationCreateRequest } from '../../models/location.model';

@Component({
  selector: 'app-location-form',
  standalone: true,
  imports: [ReactiveFormsModule, IonicModule],
  templateUrl: './create-location-form.component.html',
})
export class CreateLocationFormComponent implements OnInit {
  @Output() onLocationCreated = new EventEmitter<Location>();
  isLoading = signal(false);

  locationForm: FormGroup;

  locationQuery = signal<string>('');
  locationsService = inject(LocationService);
  locationsData = rxResource({
    params: () => ({ query: this.locationQuery() }),
    stream: ({ params }) => this.locationsService.getLocations(params.query),
  });

  constructor(private fb: FormBuilder) {
    this.locationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit() {}

  onSubmit() {
    this.isLoading.set(true);
    if (this.locationForm.valid) {
      const formValue = this.locationForm.value;
      const locationData: LocationCreateRequest = {
        name: formValue.name,
      };

      this.locationsService.createLocation(locationData).subscribe({
        next: (location: Location) => {
          this.onLocationCreated.emit(location);
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

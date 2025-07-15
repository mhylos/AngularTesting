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
import { Location, LocationUpdateRequest } from '../../models/location.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location-form',
  standalone: true,
  imports: [ReactiveFormsModule, IonicModule],
  templateUrl: './edit-location-form.component.html',
})
export class EditLocationFormComponent implements OnInit {
  @Input({ required: true }) locationId!: Location['id'];
  @Output() onLocationUpdated = new EventEmitter<Location>();

  private isLoadingSignal = signal(false);

  locationForm: FormGroup;

  locationQuery = signal<string>('');
  locationsService = inject(LocationService);
  locationsData = rxResource({
    params: () => ({ query: this.locationQuery() }),
    stream: ({ params }) => this.locationsService.getLocations(params.query),
  });

  constructor(private fb: FormBuilder, private router: Router) {
    this.locationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit() {
    this.isLoadingSignal.set(true);
    this.locationsService.getLocationById(this.locationId).subscribe({
      next: (location) => {
        this.locationForm.patchValue({
          name: location.name,
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
    if (this.locationForm.valid) {
      const formValue = this.locationForm.value;
      const locationData: LocationUpdateRequest = {
        name: formValue.name,
      };

      this.locationsService
        .updateLocation(this.locationId, locationData)
        .subscribe({
          next: (location: Location) => {
            this.onLocationUpdated.emit(location);
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

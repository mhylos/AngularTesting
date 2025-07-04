import {
  Component,
  ViewChild,
  Input,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonModal,
  IonTitle,
  IonToolbar,
  IonSelect,
  IonSelectOption,
  IonLabel,
} from '@ionic/angular/standalone';
import { OverlayEventDetail } from '@ionic/core/components';
import { Place, PlaceCreateRequest } from '../../models/place.model';
import { Location } from '../../../locations/models/location.model';

@Component({
  selector: 'app-place-modal',
  templateUrl: './place-modal.component.html',
  styleUrls: ['./place-modal.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonModal,
    IonTitle,
    IonToolbar,
    IonSelect,
    IonSelectOption,
    IonLabel,
  ],
})
export class PlaceModalComponent implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  @Input() locations: Location[] = [];

  // Output events for parent component to handle
  @Output() placeCreated = new EventEmitter<PlaceCreateRequest>();
  @Output() placeUpdated = new EventEmitter<Place>();
  @Output() modalClosed = new EventEmitter<void>();

  placeForm!: FormGroup;
  isEditMode = false;
  currentPlace?: Place;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.placeForm = this.formBuilder.group({
      name: [
        this.currentPlace?.name || '',
        [Validators.required, Validators.minLength(2)],
      ],
      locationId: [this.currentPlace?.locationId || '', [Validators.required]],
    });
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.modalClosed.emit();
  }

  confirm() {
    if (this.placeForm.valid) {
      const formValue = this.placeForm.value;
      const selectedLocation = this.locations.find(
        (loc) => loc.id === parseInt(formValue.locationId)
      );

      if (!selectedLocation) {
        console.error('No se encontró la ubicación seleccionada');
        return;
      }

      const placeData: PlaceCreateRequest = {
        name: formValue.name,
        locationId: selectedLocation.id,
      };

      if (this.isEditMode && this.currentPlace?.id) {
        const updatedPlace: Place = {
          ...placeData,
          id: this.currentPlace.id,
        };
        this.placeUpdated.emit(updatedPlace);
      } else {
        this.placeCreated.emit(placeData);
      }

      this.modal.dismiss(placeData, 'confirm');
    }
  }

  private resetForm() {
    this.placeForm.reset();
    this.currentPlace = undefined;
    this.isEditMode = false;
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirm') {
      console.log('Recinto guardado:', event.detail.data);
    }
  }

  get nameControl() {
    return this.placeForm.get('name');
  }

  get locationControl() {
    return this.placeForm.get('locationId');
  }

  get modalTitle() {
    return this.isEditMode ? 'Editar Recinto' : 'Agregar Recinto';
  }

  openModal() {
    this.modal.present();
  }

  public openForEdit(place: Place) {
    this.currentPlace = place;
    this.isEditMode = true;
    this.initializeForm();
    this.openModal();
  }

  public openForCreate() {
    this.resetForm();
    this.currentPlace = undefined;
    this.isEditMode = false;
    this.initializeForm();
    this.openModal();
  }

  public isOpen(): boolean {
    return this.modal.isOpen;
  }

  public close() {
    this.modal.dismiss(null, 'cancel');
  }
}

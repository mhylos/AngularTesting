import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { PlaceService } from '../../services/place.service';
import { rxResource } from '@angular/core/rxjs-interop';
import {
  IonCol,
  IonGrid,
  IonRow,
  IonButton,
  IonIcon,
  IonSkeletonText,
} from '@ionic/angular/standalone';
import { Place, PlaceCreateRequest } from '../../models/place.model';
import {
  createOutline,
  createSharp,
  trashOutline,
  trashSharp,
  add,
} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { PlaceModalComponent } from '../place-modal/place-modal.component';
import { LocationService } from '../../../locations/services/location.service';
import { createPlaceSchema } from '../../models/place.schema';
import { SkeletonRowComponent } from 'src/app/shared/components/skeleton-row/skeleton-row.component';

@Component({
  selector: 'app-places-table',
  templateUrl: './places-table.component.html',
  styleUrls: ['./places-table.component.scss'],
  imports: [
    IonCol,
    IonGrid,
    IonRow,
    IonButton,
    IonIcon,
    PlaceModalComponent,
    SkeletonRowComponent,
  ],
})
export class PlacesTableComponent implements OnInit {
  @ViewChild(PlaceModalComponent) placeEditModal!: PlaceModalComponent;

  placesService = inject(PlaceService);
  LocationService = inject(LocationService);

  placesData = rxResource({
    stream: () => this.placesService.getPlaces(),
  });

  locationsData = rxResource({
    stream: () => this.LocationService.getLocations(),
  });

  constructor() {
    addIcons({
      trashOutline,
      trashSharp,
      createOutline,
      createSharp,
      add,
    });
  }

  ngOnInit() {}

  editPlace(place: Place) {
    if (place) {
      this.placeEditModal.openForEdit(place);
    }
  }

  addPlace() {
    this.placeEditModal.openForCreate();
  }

  onPlaceCreated(placeData: PlaceCreateRequest) {
    const parsedData = createPlaceSchema.safeParse(placeData);
    if (!parsedData.success) {
      console.error('Validación fallida:', parsedData.error);
      return;
    }
    this.placesService.createPlace(parsedData.data).subscribe({
      next: () => {
        console.log('Recinto creado', parsedData.data);
        this.placesData.reload();
      },
      error: (error) => {
        console.error('Error creando recinto:', error);
      },
    });
  }

  onPlaceUpdated(placeData: Place) {
    const parsedData = createPlaceSchema.safeParse(placeData);
    if (!parsedData.success) {
      console.error('Validación fallida:', parsedData.error);
      return;
    }

    this.placesService.updatePlace(placeData.id, parsedData.data).subscribe({
      next: () => {
        console.log('Recinto actualizado', parsedData.data);
        this.placesData.reload();
      },
      error: (error) => {
        console.error('Error actualizando recinto:', error);
      },
    });
  }

  onModalClosed() {
    console.log('Modal cerrado');
  }

  deletePlace(placeId: Place['id']) {
    if (confirm('¿Está seguro que desea eliminar este recinto?')) {
      this.placesService.deletePlace(placeId).subscribe({
        next: () => {
          console.log('Recinto eliminado correctamente');
          this.placesData.reload();
        },
        error: (error) => {
          console.error('Error eliminando recinto:', error);
        },
      });
    }
  }
}

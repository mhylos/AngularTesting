import { Component, inject, OnInit, signal } from '@angular/core';
import { PlaceService } from '../../services/place.service';
import { rxResource } from '@angular/core/rxjs-interop';
import {
  IonCol,
  IonGrid,
  IonRow,
  IonButton,
  IonIcon,
  IonToast,
  AlertController,
} from '@ionic/angular/standalone';
import {
  createOutline,
  createSharp,
  trashOutline,
  trashSharp,
  addOutline,
  addSharp,
} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { LocationService } from '../../../locations/services/location.service';
import { SkeletonRowComponent } from 'src/app/shared/components/skeleton-row/skeleton-row.component';
import { RouterLinkWithHref } from '@angular/router';
import { Place } from '../../models/place.model';

@Component({
  selector: 'app-places-table',
  templateUrl: './places-table.component.html',
  imports: [
    IonCol,
    IonGrid,
    IonRow,
    IonButton,
    IonIcon,
    SkeletonRowComponent,
    RouterLinkWithHref,
    IonButton,
    IonIcon,
    IonToast,
  ],
})
export class PlacesTableComponent implements OnInit {
  placesLoading = signal<Place['id'][]>([]);
  placesService = inject(PlaceService);
  LocationService = inject(LocationService);
  toast = {
    isOpen: signal(false),
    message: signal(''),
  };

  placesData = rxResource({
    stream: () => this.placesService.getPlaces(),
  });

  locationsData = rxResource({
    stream: () => this.LocationService.getLocations(),
  });

  constructor(private alertController: AlertController) {
    addIcons({
      trashOutline,
      trashSharp,
      createOutline,
      createSharp,
      addOutline,
      addSharp,
    });
  }

  ngOnInit() {}

  deletePlace(placeId: Place['id']) {
    this.placesLoading.set([...this.placesLoading(), placeId]);

    this.placesService.deletePlace(placeId).subscribe({
      next: () => {
        this.placesData.update((places) =>
          places?.filter((place) => place.id !== placeId)
        );
        this.toast.isOpen.set(true);
        this.toast.message.set(`Recinto ${placeId} eliminado correctamente.`);
      },
      error: (error) => {
        console.error('Error deleting place:', error);
        this.placesLoading.set(
          this.placesLoading().filter((id) => id !== placeId)
        );
        this.toast.isOpen.set(true);
        this.toast.message.set('Error eliminado recinto.');
      },
    });
  }

  isRowLoading(placeId: Place['id']): boolean {
    return this.placesLoading().includes(placeId);
  }

  async showDeleteAlert(placeId: Place['id']) {
    const alert = await this.alertController.create({
      header: '¿Está seguro de eliminar este recinto?',
      message: 'Esta acción no se puede deshacer.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          handler: () => {
            this.deletePlace(placeId);
          },
        },
      ],
    });

    await alert.present();
  }
}

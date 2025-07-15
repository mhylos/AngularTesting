import { Component, inject, OnInit, signal } from '@angular/core';
import { LocationService } from '../../services/location.service';
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
import { SkeletonRowComponent } from '@/shared/components/skeleton-row/skeleton-row.component';
import { RouterLinkWithHref } from '@angular/router';
import { Location } from '../../models/location.model';

@Component({
  selector: 'app-location-table',
  templateUrl: './location-table.component.html',
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
export class LocationsTableComponent implements OnInit {
  locationsLoading = signal<Location['id'][]>([]);
  locationService = inject(LocationService);
  toast = {
    isOpen: signal(false),
    message: signal(''),
  };

  locationsData = rxResource({
    stream: () => this.locationService.getLocations(),
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

  deleteLocation(locationId: Location['id']) {
    this.locationsLoading.set([...this.locationsLoading(), locationId]);

    this.locationService.deleteLocation(locationId).subscribe({
      next: () => {
        this.locationsData.update((locations) =>
          locations?.filter((location) => location.id !== locationId)
        );
        this.toast.isOpen.set(true);
        this.toast.message.set(
          `Ubicación ${locationId} eliminada correctamente.`
        );
      },
      error: (error) => {
        console.error('Error deleting location:', error);
        this.locationsLoading.set(
          this.locationsLoading().filter((id) => id !== locationId)
        );
        this.toast.isOpen.set(true);
        this.toast.message.set('Error eliminado ubicación.');
      },
    });
  }

  isRowLoading(locationId: Location['id']): boolean {
    return this.locationsLoading().includes(locationId);
  }

  async showDeleteAlert(locationId: Location['id']) {
    const alert = await this.alertController.create({
      header: '¿Está seguro de eliminar esta ubicación?',
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
            this.deleteLocation(locationId);
          },
        },
      ],
    });

    await alert.present();
  }
}

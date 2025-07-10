import { Component, inject, OnInit, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import {
  IonCol,
  IonGrid,
  IonRow,
  IonButton,
  IonIcon,
  IonSkeletonText,
  IonToast,
  IonAlert,
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
import { SkeletonRowComponent } from 'src/app/shared/components/skeleton-row/skeleton-row.component';
import { RouterLinkWithHref } from '@angular/router';
import { DeviceService } from '../../services/device.service';
import { Device } from '../../models/device.model';

@Component({
  selector: 'app-devices-table',
  templateUrl: './devices-table.component.html',
  styleUrls: ['./devices-table.component.scss'],
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
export class DevicesTableComponent implements OnInit {
  devicesLoading = signal<Device['uid'][]>([]);
  devicesService = inject(DeviceService);

  toast = {
    isOpen: signal(false),
    message: signal(''),
  };

  devicesData = rxResource({
    stream: () => this.devicesService.getDevices(),
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

  deleteDevices(deviceId: Device['uid']) {
    this.devicesLoading.set([...this.devicesLoading(), deviceId]);

    this.devicesService.deleteDevice(deviceId).subscribe({
      next: () => {
        this.devicesData.update((devices) =>
          devices?.filter((device) => device.uid !== deviceId)
        );
        this.toast.isOpen.set(true);
        this.toast.message.set(
          `Dispositivo ${deviceId} eliminado correctamente.`
        );
      },
      error: (error) => {
        console.error('Error deleting device:', error);
        this.devicesLoading.set(
          this.devicesLoading().filter((id) => id !== deviceId)
        );
        this.toast.isOpen.set(true);
        this.toast.message.set('Error eliminado dispositivo.');
      },
    });
  }

  isRowLoading(deviceId: Device['uid']): boolean {
    return this.devicesLoading().includes(deviceId);
  }

  async showDeleteAlert(deviceId: Device['uid']) {
    const alert = await this.alertController.create({
      header: '¿Está seguro de eliminar este dispositivo?',
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
            this.deleteDevices(deviceId);
          },
        },
      ],
    });

    await alert.present();
  }
}

import { Component, inject, OnInit, signal } from '@angular/core';
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
import { AccessEvent } from '../../models/access-event.model';
import { AccessEventService } from '../../services/access-event.service';
import { PrettyRutPipe } from '@/shared/pipes/pretty-rut.pipe';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-access-events-table',
  templateUrl: './access-events-table.component.html',
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
    PrettyRutPipe,
    DatePipe,
  ],
})
export class AccessEventsTableComponent implements OnInit {
  accessEventsLoading = signal<AccessEvent['id'][]>([]);
  accessEventService = inject(AccessEventService);
  toast = {
    isOpen: signal(false),
    message: signal(''),
  };

  accessEventsData = rxResource({
    stream: () => this.accessEventService.getAccessEvents(),
  });

  constructor() {
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

  isRowLoading(accessEventId: AccessEvent['id']): boolean {
    return this.accessEventsLoading().includes(accessEventId);
  }
}

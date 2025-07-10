import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import {
  IonCol,
  IonGrid,
  IonRow,
  IonButton,
  IonIcon,
  IonToast,
  AlertController,
  IonChip,
} from '@ionic/angular/standalone';
import { SkeletonRowComponent } from 'src/app/shared/components/skeleton-row/skeleton-row.component';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { addIcons } from 'ionicons';
import {
  trashOutline,
  trashSharp,
  createOutline,
  createSharp,
  addOutline,
  addSharp,
} from 'ionicons/icons';
import { PrettyRutPipe } from 'src/app/shared/pipes/pretty-rut.pipe';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
  imports: [
    IonCol,
    IonGrid,
    IonRow,
    SkeletonRowComponent,
    IonToast,
    IonChip,
    PrettyRutPipe,
  ],
})
export class UsersTableComponent implements OnInit {
  usersLoading = signal<User['rut'][]>([]);
  usersService = inject(UserService);
  toast = {
    isOpen: signal(false),
    message: signal(''),
  };

  usersData = rxResource({
    stream: () => this.usersService.getUsers(),
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
}

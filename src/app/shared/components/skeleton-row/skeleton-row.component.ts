import { Component, Input, OnInit } from '@angular/core';
import { IonRow, IonCol, IonSkeletonText } from '@ionic/angular/standalone';

@Component({
  selector: 'app-skeleton-row',
  templateUrl: './skeleton-row.component.html',
  imports: [IonRow, IonCol, IonSkeletonText],
})
export class SkeletonRowComponent implements OnInit {
  @Input() rows: number = 3;
  @Input() cellsSizes: number[] = [1, 5, 4, 2];

  rowsArray: number[] = [];

  ngOnInit() {
    this.rowsArray = Array.from({ length: this.rows }, (_, i) => i);
  }
}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-searchable-select',
  templateUrl: './searchable-select.component.html',
  styleUrls: ['./searchable-select.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SearchableSelectComponent,
      multi: true,
    },
  ],
})
export class SearchableSelectComponent<T> implements ControlValueAccessor {
  @Input() title: string = 'Seleccione una opción';
  @Input() data: T[] = [];
  @Input() multiple = false;
  @Input() keyName!: keyof T;
  @Input() selected: T[] = [];
  @Input() isLoading = false;

  @Output() selectedChanged: EventEmitter<T[]> = new EventEmitter<T[]>();
  @Output() searchInput: EventEmitter<string> = new EventEmitter<string>();
  isOpen = false;

  // ControlValueAccessor implementation
  private onChange = (value: T | T[] | null) => {};
  private onTouched = () => {};
  private disabled = false;

  constructor() {}
  // ngOnInit() {
  //   this.filtered = [...this.data];
  // }

  open() {
    this.searchInput.emit();
    this.onTouched();
    if (!this.isDisabled) {
      this.isOpen = true;
    }
  }

  cancel() {
    this.isOpen = false;
  }

  confirm() {
    this.isOpen = false;
  }

  select(item: T) {
    if (!this.multiple) {
      this.selected = [item];
      this.selectedChanged.emit([item]);
      this.onChange(item);
      this.isOpen = false;
    } else {
      const index = this.selected.findIndex(
        (selectedItem) => selectedItem === item
      );
      if (index > -1) {
        this.selected.splice(index, 1);
      } else {
        this.selected.push(item);
      }
      const newSelected = [...this.selected];
      this.selectedChanged.emit(newSelected);
      this.onChange(newSelected);
    }
  }

  searchbarInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchInput.emit(inputElement.value);
    // this.filterList(inputElement.value);
  }

  // filterList(searchQuery: string | undefined) {
  //   if (searchQuery === undefined || searchQuery.trim() === '') {
  //     this.filtered = [...this.data];
  //   } else {
  //     const normalizedQuery = searchQuery.toLowerCase();
  //     this.filtered = this.data.filter((item) =>
  //       (item[this.keyName] as String).toLowerCase().includes(normalizedQuery)
  //     );
  //   }
  // }

  writeValue(value: T | T[] | null): void {
    if (value) {
      this.selected = Array.isArray(value) ? value : [value];
    } else {
      this.selected = [];
    }
  }

  registerOnChange(fn: (value: T | T[] | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  leaf(obj: T): string {
    return obj[this.keyName] as string;
  }

  get isDisabled(): boolean {
    return this.disabled;
  }
}

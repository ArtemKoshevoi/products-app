import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { GetItems } from '../store/items/items.actions';
import { Observable } from 'rxjs';
import { Item } from '../model/item.model';
import { ItemsState } from '../store/items/items.state';

@Component({
  selector: 'app-table-content',
  templateUrl: './table-content.component.html',
  styleUrls: ['./table-content.component.scss'],
})
export class TableContentComponent implements OnInit {
  @Select(ItemsState.getItemsList) items$: Observable<Item[]>;

  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'price',
    'count',
    'total',
  ];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new GetItems());
  }
}

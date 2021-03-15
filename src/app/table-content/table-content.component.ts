import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { DeleteItems, GetItems } from '../store/items/items.actions';
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

  displayedColumns = [
    'id',
    'name',
    'description',
    'price',
    'count',
    'total',
    'delete',
    'create',
  ];

  constructor(private store: Store) {}

  // TODO: avoid get all items after redirect
  ngOnInit(): void {
    this.store.dispatch(new GetItems());
  }

  deleteItem(id: number) {
    this.store.dispatch(new DeleteItems(id));
  }
}

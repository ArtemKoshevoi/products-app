import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';
import { Item } from '../model/item.model';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private itemsUrl = 'api/items';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getItems() {
    return this.http.get<Item[]>(this.itemsUrl).pipe(shareReplay());
  }

  addItem(newItem: Item) {
    return this.http
      .post(this.itemsUrl, newItem, this.httpOptions)
      .pipe(shareReplay());
  }
  constructor(private http: HttpClient) {}
}

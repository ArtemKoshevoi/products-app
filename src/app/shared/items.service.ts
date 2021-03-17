import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';
import { Item } from '../model/item.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private itemsUrl = 'api/items';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.itemsUrl).pipe(shareReplay());
  }

  getItem(itemId: number) {
    const url = `${this.itemsUrl}/${itemId}`;
    return this.http.get<Item>(url);
  }

  addItem(newItem: Item) {
    return this.http.post<Item>(this.itemsUrl, newItem, this.httpOptions);
  }

  deleteItem(itemId: number) {
    const url = `${this.itemsUrl}/${itemId}`;
    return this.http.delete<Item>(url, this.httpOptions);
  }

  updateItem(item: Item) {
    return this.http.put(this.itemsUrl, item, this.httpOptions);
  }

  constructor(private http: HttpClient) {}
}

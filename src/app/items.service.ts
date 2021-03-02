import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item } from './item';
import { shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private itemsUrl = 'api/items';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getItems() {
    return this.http.get<Item[]>(this.itemsUrl).pipe(
      tap((res) => console.log(111, res)),
      shareReplay()
    );
  }
  constructor(private http: HttpClient) {}
}

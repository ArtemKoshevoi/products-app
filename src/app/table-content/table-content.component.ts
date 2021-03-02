import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-table-content',
  templateUrl: './table-content.component.html',
  styleUrls: ['./table-content.component.scss'],
})
export class TableContentComponent implements OnInit {
  items$ = this.itemsService.getItems();
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'price',
    'count',
    'total',
  ];

  constructor(private itemsService: ItemsService) {}

  ngOnInit(): void {}
}

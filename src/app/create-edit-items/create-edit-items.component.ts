import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { CreateItems, CreateItemsSuccess } from '../store/items/items.actions';

@Component({
  selector: 'app-create-edit-items',
  templateUrl: './create-edit-items.component.html',
  styleUrls: ['./create-edit-items.component.scss'],
})
export class CreateEditItemsComponent implements OnInit {
  itemsForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    price: new FormControl('', Validators.required),
    count: new FormControl('', Validators.required),
    subItem: new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
    }),
  });

  constructor(private router: Router, private store: Store) {}

  onSubmit() {
    this.store.dispatch(new CreateItems(this.itemsForm.value));
    // TODO: move redirect to CreateItemsSuccess
    this.router.navigate(['/table-content']);
    this.itemsForm.reset();
  }

  ngOnInit(): void {}
}

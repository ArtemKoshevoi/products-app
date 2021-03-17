import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { CreateItems, UpdateItems } from '../store/items/items.actions';
import { ItemsState } from '../store/items/items.state';
import { Observable, Subject, Subscription } from 'rxjs';
import {
  filter,
  map,
  pluck,
  switchMap,
  switchMapTo,
  tap,
} from 'rxjs/operators';

@Component({
  selector: 'app-create-edit-items',
  templateUrl: './create-edit-items.component.html',
  styleUrls: ['./create-edit-items.component.scss'],
})
// TODO: add type check for form output
export class CreateEditItemsComponent implements OnInit, OnDestroy {
  items$: Subscription;
  itemId$: Observable<number>;
  // isEditItem$: Subject<boolean>;
  submitSub$ = new Subject<boolean>();

  constructor(
    private router: Router,
    private store: Store,
    private route: ActivatedRoute
  ) {}

  itemsForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    price: new FormControl('', Validators.required),
    count: new FormControl('', Validators.required),
    subItem: new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
    }),
  });

  onSubmit() {
    this.submitSub$.next(this.itemsForm.valid);
    // this.store.dispatch(new CreateItems(this.itemsForm.value));
    // TODO: move redirect to CreateItemsSuccess
    // this.router.navigate(['/table-content']);
    // this.itemsForm.reset();
  }

  ngOnInit(): void {
    this.itemId$ = this.route.paramMap.pipe(
      pluck('params', 'itemId'),
      map((itemId) => Number(itemId) || null)
    );

    this.items$ = this.itemId$
      .pipe(
        filter((itemId) => !!itemId),
        switchMap((itemId) => {
          return this.store.selectOnce(ItemsState.getItemById(itemId));
        })
      )
      .subscribe((item) => {
        this.itemsForm.addControl(
          'id',
          new FormControl('', Validators.required)
        );
        this.itemsForm.reset(item);
      });

    this.submitSub$
      .pipe(
        filter((isValid) => isValid),
        switchMapTo(this.itemId$)
      )
      .subscribe((itemId) => {
        const action = itemId ? UpdateItems : CreateItems;
        this.store.dispatch(
          new action(
            itemId
              ? { ...this.itemsForm.value, id: itemId }
              : this.itemsForm.value
          )
        );
        this.router.navigate(['/table-content']);
      });
  }

  ngOnDestroy() {
    this.items$.unsubscribe();
    this.submitSub$.unsubscribe();
  }
}

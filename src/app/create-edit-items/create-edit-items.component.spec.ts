import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditItemsComponent } from './create-edit-items.component';

describe('CreateEditItemsComponent', () => {
  let component: CreateEditItemsComponent;
  let fixture: ComponentFixture<CreateEditItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateEditItemsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

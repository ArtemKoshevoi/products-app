import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEditItemsComponent } from './create-edit-items/create-edit-items.component';
import { TableContentComponent } from './table-content/table-content.component';
import { CreateEditItemsResolver } from './create-edit-items/create-edit-items-resolver.service';

const routes: Routes = [
  { path: 'table-content', component: TableContentComponent },
  {
    path: 'create-edit-items',
    component: CreateEditItemsComponent,
    resolve: { item: CreateEditItemsResolver },
  },
  { path: 'create-edit-items/:id', component: CreateEditItemsComponent },
  { path: '', redirectTo: '/table-content', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const items = [
      {
        id: 1,
        name: 'Apple',
        description: 'Some description',
        price: 2,
        count: 5,
        subItem: {
          id: 101,
          name: 'subItem1',
        },
      },
      {
        id: 2,
        name: 'Banana',
        description: 'Some other description',
        price: 3,
        count: 10,
        subItem: {
          id: 102,
          name: 'subItem2',
        },
      },
      {
        id: 3,
        name: 'Snickers',
        description: 'Another description',
        price: 23,
        count: 2,
        subItem: {
          id: 103,
          name: 'subItem3',
        },
      },
      {
        id: 4,
        name: 'Machinegun',
        description: 'Now I have a machinegun ho ho ho',
        price: 500,
        count: 1,
        subItem: {
          id: 104,
          name: 'subItem4',
        },
      },
      {
        id: 5,
        name: 'Oil',
        description: 'Description about oil',
        price: 20,
        count: 8,
        subItem: {
          id: 105,
          name: 'subItem5',
        },
      },
      {
        id: 6,
        name: 'IPhone X',
        description: 'This is IPhone, beach',
        price: 850,
        count: 4,
        subItem: {
          id: 106,
          name: 'subItem6',
        },
      },
      {
        id: 7,
        name: 'Tube',
        description: 'What is this?',
        price: 17,
        count: 14,
        subItem: {
          id: 107,
          name: 'subItem7',
        },
      },
      {
        id: 8,
        name: 'Cup',
        description: 'Just a cup',
        price: 14,
        count: 20,
        subItem: {
          id: 108,
          name: 'subItem8',
        },
      },
      {
        id: 9,
        name: 'Toilet pepper',
        description: 'Is a very useful thing',
        price: 4,
        count: 9,
        subItem: {
          id: 109,
          name: 'subItem9',
        },
      },
      {
        id: 10,
        name: 'Dog',
        description: 'Who let the dogs out?',
        price: 150,
        count: 1,
        subItem: {
          id: 110,
          name: 'subItem10',
        },
      },
    ];
    return { items };
  }
}

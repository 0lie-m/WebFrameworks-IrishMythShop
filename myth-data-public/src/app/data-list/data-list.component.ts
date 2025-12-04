import { Component, OnInit } from '@angular/core';
import { MythDataService } from '../myth-data.service';

export class Product {
  _id!: string;
  name!: string;
  type!: string;
  description!: string;
  price!: number;
  manufacturer!: string;
  quantity!: number;
  status!: string;

}

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css'],
  providers: [MythDataService]
})
export class DataListComponent implements OnInit {

  products: Product[] = [];

  constructor(private mythDataService: MythDataService) { }

  private getProducts(): void {
    this.mythDataService
      .getProducts()
      .then(foundProducts => {
        this.products = foundProducts;
      });
  }

  ngOnInit(): void {
    this.getProducts();
  }
}

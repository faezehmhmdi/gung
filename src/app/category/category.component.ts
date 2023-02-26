import {Component, Input} from '@angular/core';
import {ProductService} from "../services/product.service";
import {firstValueFrom, map} from "rxjs";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],

})
export class CategoryComponent {

  constructor(
    public productService: ProductService
  ) {
  }

  @Input() category: any;
  @Input() filterName: string = ""
  @Input() filterId: string = ""
  @Input() filterPrice: string = ""
  @Input() inStock: boolean = false
  @Input() volumeMin: number = 0;
  @Input() volumeMax: number = 0;
  @Input() linkedToMain: boolean = false;
  currentPage = 1;
  itemsPerPage = 10;
  filteredCategories = [];


  ngOnInit() {

  }

  ngOnChanges() {
    this.filterCategories()
  }

  async filterCategories() {
    this.filteredCategories = this.category.children
    if (this.filterName) {
      this.filteredCategories = this.category.children
        .map((x: any) => ({
          ...x,
          children: x.children.filter((x: { name: string; }) => x.name.toLowerCase().startsWith(this.filterName.toLowerCase()))
        })).filter((x: any) => x.children.length > 0);
    }
    if (this.filterId) {
      this.filteredCategories = this.category.children
        .map((x: any) => ({
          ...x,
          children: x.children.filter((x: { id: string; }) => x.id.startsWith(this.filterId))
        })).filter((x: any) => x.children.length > 0);
    }

    if (this.filterPrice) {
      this.filteredCategories = this.category.children
        .map((x: any) => ({
          ...x,
          children: x.children.filter((x: { price: string; }) => x.price == this.filterPrice)
        })).filter((x: any) => x.children.length > 0);
    }
    if (this.inStock) {
      this.filteredCategories = this.category.children
        .map((x: any) => ({
          ...x,
          children: x.children.filter((x: { inStock: number; }) => x.inStock > 0)
        })).filter((x: any) => x.children.length > 0).sort((a: any, b: any) => {
          const aLGA = Math.min(...a.children.map((x: any) => x.inStock));
          const bLGA = Math.min(...b.children.map((x: any) => x.inStock));
          return aLGA - bLGA;
        });
    }

    if (this.volumeMin && this.volumeMax) {
      this.filteredCategories = this.category.children
        .map((x: any) => ({
          ...x,
          children: x.children.filter((x: { vol: number; }) => x.vol >= this.volumeMin && x.vol <= this.volumeMax)
        })).filter((x: any) => x.children.length > 0).sort((a: any, b: any) => {
          const aVOL = Math.min(...a.children.map((x: any) => x.vol));
          const bVOL = Math.min(...b.children.map((x: any) => x.vol));
          return aVOL - bVOL;
        });
    }
  }


  isCategory(category: any) {
    return category.id.startsWith("s");
  }

  isProduct(category: any) {
    return !category.id.startsWith("s");
  }


}

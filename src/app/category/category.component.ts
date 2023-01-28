import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],

})
export class CategoryComponent {

  constructor(
    private router: Router
  ) {
  }

  @Input() category: any;
  @Input() filterName: string = ""
  @Input() filterId: string = ""
  @Input() filterPrice: string = ""
  currentPage = 1;
  itemsPerPage = 10;
  filteredCategories = [];

  ngOnInit() {
    this.filteredCategories = this.category.children
  }

  ngOnChanges() {
    this.filterChildren();
    console.log(this.filteredCategories)
  }

  filterChildren() {
    this.filteredCategories = this.category.children;
    if (this.filterName) {
      this.filteredCategories = this.filteredCategories.filter((x: { name: string; }) => x.name.toLowerCase().includes(this.filterName.toLowerCase()));
    }
    if (this.filterId) {
      this.filteredCategories = this.filteredCategories.filter((x: { id: number; }) => x.id === +this.filterId);
    }
    if (this.filterPrice) {
      this.filteredCategories = this.filteredCategories.filter((x: { price: number; }) => x.price === +this.filterPrice);
    }

    this.currentPage = 1;
    this.itemsPerPage = 10;
  }

  isCategory(category: any) {
    return category.id.startsWith("s");
  }

  isProduct(category: any) {
    return !category.id.startsWith("s");
  }

  showProductInfo(id: string) {
  }


}

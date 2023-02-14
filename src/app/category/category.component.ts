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
  @Input() childrenData: any;
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
          children: x.children.filter((x: { name: string; }) => x.name.toLowerCase().includes(this.filterName.toLowerCase()))
        })).filter((x: any) => x.children.length > 0);
    }
    if (this.filterId) {
      this.filteredCategories = this.category.children
        .map((x: any) => ({
          ...x,
          children: x.children.filter((x: { id: string; }) => x.id.includes(this.filterId))
        })).filter((x: any) => x.children.length > 0);
    }
    if (this.filterPrice) {
      const filteredCategories =
        this.filteredCategories.map(async (x: any) => {
          const children = await Promise.all(
            x.children.map(async (child: any) => {
              if (!this.isProduct(child)) {
                return child;
              }
              const product = await firstValueFrom(this.productService.getRandomProduct(child.id));
              // @ts-ignore
              if (product.extra.AGA.PRI.replace(" ", "").startsWith(this.filterPrice) ) {
                console.log(this.filterPrice)
                // @ts-ignore
                console.log(product.extra.AGA.PRI.replace(" ", ""))
                return child;
              }
            })
          );
          return {...x, children: children.filter((c) => c)};
        })
      // @ts-ignore
      this.filteredCategories = filteredCategories.filter((x) => x.children.length > 0);
    }
  }


  isCategory(category: any) {
    return category.id.startsWith("s");
  }

  isProduct(category: any) {
    return !category.id.startsWith("s");
  }


}

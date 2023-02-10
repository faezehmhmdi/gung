import {Component} from '@angular/core';
import {CategoryService, Category} from "./services/category.service";
import {first, Observable} from "rxjs";
import {ProductService} from "./services/product.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService
  ) {

  }

  title = 'Gung';
  category: Category | undefined;
  filterName: any;
  filterId: any;
  filterPrice: any;
  inStock: any;
  childrenData: object = new Map<string, object>();


  ngOnInit() {
    this.getCategories();
  }


  getCategories() {
    this.categoryService.getAlotOfCategories().pipe().subscribe(res => {
      this.category = res
    })
  }



}


import {Component} from '@angular/core';
import {CategoryService, Category} from "./services/category.service";
import {first, firstValueFrom, map, Observable} from "rxjs";
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

  ngOnInit() {
    this.getCategories();
  }


  getCategories() {
    const rep = async (x: Category) => {
      if (!x.id.startsWith("s")) {
        x.name = await firstValueFrom(this.productService.getRandomProduct(x.id).pipe(map(r => r.name)))
        return x
      } else {
        x.children = await Promise.all(x.children.map(async y => await rep(y)))
        return x
      }
    }
    this.categoryService.getAlotOfCategories().pipe().subscribe(async res => {
      this.category = await rep(res)
    })
  }
}


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
  filterName: string = "";
  filterId: string = "";
  filterPrice: string = "";
  inStock: any;
  linkedToMain: any;
  volumeMin: number = 0;
  volumeMax: number = 0;

  ngOnInit() {
    this.getCategories();
  }


  async getCategories() {
    const rep = async (x: any) => {
      if (!x.id.startsWith("s")) {
        await firstValueFrom(this.productService.getRandomProduct(x.id).pipe(map(r => {
          x.name = r.name;
          x.id = r.id;
          x.price = r.extra['AGA'].PRI.replaceAll(' ', '');
          x.inStock = Number(r.extra['AGA'].LGA.replaceAll(' ', ''));
          x.vol = Number(r.extra['AGA'].VOL.replaceAll(' ', ''));
        })))
        return x
      } else {
        x.children = await Promise.all(x.children.map(async (y: any) => await rep(y)))
        return x
      }
    }
    this.categoryService.getAlotOfCategories().pipe().subscribe(async res => {
      this.category = await rep(res)
    })
  }
}


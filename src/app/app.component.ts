import {Component} from '@angular/core';
import {CategoryService, Category} from "./services/category.service";
import {first, Observable} from "rxjs";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private categoryService: CategoryService,
  ) {

  }

  title = 'Gung';
  category: Category | undefined;
  filterName: any;
  filterId: any;
  filterPrice: any;


  ngOnInit() {
    this.getCategories()
  }

  updateLine(e: any) {
    console.log(e)
  }
  getCategories() {
    this.categoryService.getAlotOfCategories().pipe().subscribe(res => {
      this.category = res
    })
  }

}


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


  ngOnInit() {
    this.getCategories()
  }

  getCategories() {
    this.categoryService.getCategories().pipe().subscribe(res => {
      this.category = res
    })
  }

}


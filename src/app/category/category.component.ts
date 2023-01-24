import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

  constructor(
    private router: Router
  ) {
  }

  @Input() category: any;
  currentPage = 1;
  itemsPerPage = 10;

  ngOnInit() {
  }

  isCategory(category: any) {
    return category.id.startsWith("s");
  }

  isProduct(category: any) {
    return !category.id.startsWith("s");
  }

  onInnerButtonClick(e: Event) {
    e.stopPropagation();
  }



  showProductInfo(id: string) {
  }


}

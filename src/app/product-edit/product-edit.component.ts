import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { Category } from '../model/Category';
import { DatePipe } from '@angular/common';
import * as FormMax from '../form-max';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  categories: [];
  product: any;
  category: any;
  
  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router,  private categoryService: CategoryService, private datepipe: DatePipe) { }

  ngOnInit() {
    this.categoryService.getCategory().subscribe(data =>{
      this.categories = data;
    });

    this.productService.getProduct(this.route.snapshot.params['id']).subscribe(data =>{
      this.product = data;

      this.product.date_added = this.datepipe.transform(this.product.date_added, 'yyyy-MM-dd');
      
      if(!this.product.category){ 
        this.product.category = new Category();
      }
    });
  }

  onKeyUp = FormMax.onKeyUp

  updateProduct(){
    this.productService.updateProduct(this.product);
    this.navigateDetail();
  }

  cancelUpdate(){
    this.navigateDetail();
  }

  navigateDetail(){
    this.router.navigate(['/product', this.route.snapshot.params['id']]);
  }

}
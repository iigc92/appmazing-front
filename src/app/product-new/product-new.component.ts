import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { CategoryService } from '../category.service';
import { Category } from '../model/Category';
import { Product } from '../model/Product';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})

export class ProductNewComponent implements OnInit {
  category: Category = new Category();
  categories: [];
  product: Product = new Product();
  
  constructor(private router: Router, private productsService: ProductService, private categoryService: CategoryService) { }

  ngOnInit() : void{
    this.categoryService.getCategory().subscribe(data =>{
      this.categories = data;
    });
  }

  newProduct(){
    const product = {
      name: this.product.name,
      stock: this.product.stock,
      price: this.product.price,
      active: this.product.active,
      date_added: new Date(),
      category: this.category
    }

    // let values = Object.values(product);
    
    // for(let i=0;i<values.length; i++){
    //   console.log(values[i]);
    //   if(values[i]==null || Object.keys(Category).length==0){
    //     do{
    //       alert("Quedan campos por cumplimentar");
    //       break;
    //     }while(values[i]==null || Object.keys(Category).length==0)
    //   }

    // }
    

    this.productsService.newProduct(product);
    this.navigateToHome();
  }

  cancelInsert(){
    this.navigateToHome();
  }

  navigateToHome(){
    this.router.navigate(['/products']);
  }
}

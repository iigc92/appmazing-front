import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { MatDialog } from '@angular/material';
import { ProductDeleteComponent } from '../product-delete/product-delete.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: any;

  constructor(private productsService: ProductService, private route: ActivatedRoute, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.productsService.getProduct(this.route.snapshot.params['id']).subscribe(data =>{
      this.product = data
    })
  }

  openDeleteDialog(productId: number): void{
    this.dialog.open(ProductDeleteComponent, {data: {productId: productId}});
  }

  editProduct(){
    this.router.navigate(['/product/edit', this.route.snapshot.params['id']])
  }

  closeProduct(){
    this.router.navigate(['/products']);
  }

}

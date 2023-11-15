import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { Category } from '../model/Category';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  categories: [];
  product: any;
  category: any;
  
  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router,  private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getCategory().subscribe(data =>{
      this.categories = data;
    });

    this.productService.getProduct(this.route.snapshot.params['id']).subscribe(data =>{
      this.product = data;

      this.product.date_added=fechaISOToEsp(this.product.date_added);
      
      if(!this.product.category){ 
        this.product.category = new Category();
      }
    });
   
  }

  updateProduct(){
    this.product.date_added= fechaEspToISO(this.product.date_added);
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

function fechaISOToEsp(fec:string): string{
  let f = fec.split('-');
  let anio = f[0];
  let mes = f[1];
  let d = f[2].split('T');
  let dia = d[0];
  return dia + '/' + mes + '/' + anio;
}

function fechaEspToISO(fecISO:string): string{
  let f = fecISO.split('/');
  let pdia = f[0];
  let pmes = f[1];
  let panio = f[2];
  return panio + '-' + pmes + '-' + pdia + 'T23:00:00.000+00:00' 
}
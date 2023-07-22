import { Component, OnInit } from '@angular/core';
import { ProductServiceService,Data } from '../product-service.service';

import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pro-list',
  templateUrl: './pro-list.component.html',
  styleUrls: ['./pro-list.component.css'],
})
export class ProListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'product_name',
    'product',
    'cost',
    'product_image',
    'createdAt',
    'product_material',
    'description',
    'product_type'
  ];
  product: Data = {
    id: '',
    createdAt: '',
    product_name: '',
    product_image: '',
    product_type: '',
    cost: '',
    description: '',
    product_material: '',
    product: '',
  };
  dataSource: any = [];
  Subscription: Subscription = new Subscription();
  constructor(public productServiceService: ProductServiceService) {}

  ngOnInit() {}
  loadProducts() {
    this.productServiceService.loadProductList().subscribe((res: any) => {
      let apiDataTable = [];
      for (let i = 0; i < res.length; i++) {
        let obj = {
          id: res[i].id,
          product_name: res[i].product_name,
          product: res[i].product,
          cost: res[i].cost,
          createdAt: res[i].createdAt,
          product_material: res[i].product_material,
          description:  res[i].description,
          product_type: res[i].product_type,
          product_image: res[i].product_image
        };
        apiDataTable.push(obj);
      }
      this.dataSource = apiDataTable;
    });
  }
  Insert(Form:NgForm){
    this.Subscription=this.productServiceService.add(Form.value).subscribe({
      next: (Data:any) =>{
        if('errorNum' in Data){
          console.log("Hello");
        }
        else{
          alert("Done");
        }
      }
    })
  }
  loadProductById(productId: string) {
    this.productServiceService.getProductById(productId).subscribe(
      (product) => {
        this.product = product;
      },
      (error) => {
        console.error('Error fetching product by ID:', error);
      }
    );
  }

  updateProduct() {
    this.productServiceService.updateProduct(this.product).subscribe(
      (updatedProduct) => {
        console.log('Product updated successfully:', updatedProduct);
        // Handle success or other operations if needed
      },
      (error) => {
        console.error('Error updating product:', error);
      }
    );
  }
  deleteProduct() {
    if (this.product.id) {
      this.productServiceService.deleteProductById(this.product.id).subscribe(
        () => {
          console.log('Product deleted successfully');
          // Handle success or other operations if needed
        },
        (error) => {
          console.error('Error deleting product:', error);
        }
      );
    } else {
      console.warn('Product ID is missing. Unable to delete.');
    }
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Product } from '../product';

@Component({
  selector: 'app-product-component',
  templateUrl: './product-component.component.html',
  styleUrls: ['./product-component.component.css']
})
export class ProductComponentComponent implements OnInit {
  productForm: FormGroup;
  pid: AbstractControl;
  pName: AbstractControl;
  pNumber: AbstractControl;


  baseUrl = "http://127.0.0.1:8080/";

  PRODUCT$: Observable<any>;
  currentProduct: Product;

  constructor(private fb: FormBuilder, private httpClient: HttpClient) {

    this.productForm = this.fb.group({
      'pName': [''],
      'pNumber': [''],
      'pid': ['']
    });

    this.pName = this.productForm.controls['pName']
    this.pid = this.productForm.controls['pid']
    this.pNumber = this.productForm.controls['pNumber']
  }

  ngOnInit(): void {
    this.PRODUCT$ = <Observable<Product>>this.httpClient.get(this.baseUrl + 'products');

  }

  search() {
    if (this.pid.value) {
      this.PRODUCT$ = <Observable<Product>>this.httpClient.get(this.baseUrl + 'products/' + this.pid.value);
    } else {
      this.PRODUCT$ = <Observable<Product>>this.httpClient.get(this.baseUrl + 'products');
    }
  }






  showall() {
    this.PRODUCT$ = <Observable<Product>>this.httpClient.get(this.baseUrl + 'products');
  }

  add() {
    console.log(this.productForm.value);
    this.httpClient.post(this.baseUrl + 'product',
      this.productForm.value).subscribe(
        (val: any) => { // val是服务器返回的值 
          if (val.succ) {
            alert('添加成功!');
          }
        }
      );
  }

  select(u: Product) {
    this.currentProduct = u;
    this.productForm.setValue(this.currentProduct);
  }


  delete() {
    if (!this.currentProduct) {
      alert('必须先选择用户!');
    } else {
      this.httpClient.delete(this.baseUrl + 'product/' +
        this.currentProduct.pid).subscribe(
          (val: any) => {
            if (val.succ) {
              this.ngOnInit();
              alert('删除成功!');
            }
          }
        )
    }
  }

  update() {
    if (!this.currentProduct) {
      alert('必须先选择用户!');
    } else {
      this.httpClient.put(this.baseUrl + 'product',
        this.productForm.value).subscribe(
          (val: any) => {
            if (val.succ) {
              this.ngOnInit();
              alert('修改成功!');
            }
          }
        );
    }
  }
}








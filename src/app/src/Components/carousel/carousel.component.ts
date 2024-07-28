import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { HttpClient } from '@angular/common/http';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, CarouselModule, ProductCardComponent],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit {


  @Input() title: string = '';

  @ViewChild('carouselItems') carouselItems!: ElementRef;

  currentIndex: number = 0;

  products: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    if (this.title=='Tudo' || this.title=='tudo') {
      this.productService.getProducts().subscribe(data => {
        this.products = data;
      });
    }
    else{
      this.productService.getProdutosByCategoria(this.title).subscribe(data => {
        this.products = data;
      });
    }
  }


  scroll(direction: number): void {
    const itemWidth = 220; // Ajuste com base no tamanho real do item
    const containerWidth = this.carouselItems.nativeElement.offsetWidth;
    const itemsCount = this.products.length;

    this.currentIndex += direction;
    if (this.currentIndex < 0) this.currentIndex = 0;
    if (this.currentIndex >= itemsCount) this.currentIndex = itemsCount - 1;

    const offset = -this.currentIndex * itemWidth;
    this.carouselItems.nativeElement.style.transform = `translateX(${offset}px)`;
  }
}

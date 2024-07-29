import { Component } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ProductService } from '../../../services/product.service';
import { NgFor, NgIf } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    MatIconButton,
    NgIf,
    NgFor,
    ProductCardComponent,
    FormsModule
  ],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css',
})
export class SearchbarComponent {
  searchTerm: string = '';
  results: any[] = [];

  constructor(private productService: ProductService) {}

  search(): void {
    if (this.searchTerm.trim()) {
      this.productService.PesquisaProduto(this.searchTerm).subscribe(
        (data) => {
          this.results = data;
        },
        (error) => {
          console.error('Erro ao buscar produtos', error);
        }
      );
    }
  }
}

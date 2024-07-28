import { Component } from '@angular/core';
import { HeaderComponent } from '../../Components/header/header.component';
import { SearchbarComponent } from '../../Components/searchbar/searchbar.component';
import { ProductCardComponent } from "../../Components/product-card/product-card.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, SearchbarComponent, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

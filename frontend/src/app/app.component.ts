import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './componentes/footer/footer.component';
import { BannerCarritoComponent } from './componentes/banner-carrito/banner-carrito.component';
import { BannerService } from './services/banner.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CommonModule, FooterComponent, BannerCarritoComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  mostrarBanner = false;

  constructor(private bannerService: BannerService) { }

  ngOnInit(): void {
    this.bannerService.mostrarBanner$.subscribe(valor => {
      this.mostrarBanner = valor;
    });
  }
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './componentes/footer/footer.component';
import { BannerCarritoComponent } from './componentes/banner-carrito/banner-carrito.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CommonModule, FooterComponent, BannerCarritoComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'golpe-pedal-frontend';
  mostrarBanner = false;

   mostrarBannerCarrito(): void {
    this.mostrarBanner = true;
    setTimeout(() => this.mostrarBanner = false, 1500);
  }
}

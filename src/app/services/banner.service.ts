import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BannerService {
  private mostrarBannerSubject = new BehaviorSubject<boolean>(false);
  mostrarBanner$ = this.mostrarBannerSubject.asObservable();

  mostrarBannerTemporal(): void {
    this.mostrarBannerSubject.next(true);
    setTimeout(() => this.mostrarBannerSubject.next(false), 1500);
  }
}

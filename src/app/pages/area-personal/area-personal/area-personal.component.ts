import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-area-personal',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './area-personal.component.html',
  styleUrls: ['./area-personal.component.scss']
})
export class AreaPersonalComponent {}

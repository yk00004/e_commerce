import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import * as AOS from 'aos';
@Component({
  selector: 'app-root',
  imports: [HeaderComponent,FooterComponent,RouterOutlet,MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'webapp';
  ngOnInit(): void {
    AOS.init({
      duration: 1000, // animation duration in ms
      once: true // whether animation should happen only once
    });
  }
}

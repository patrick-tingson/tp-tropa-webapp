import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss'
})
export class FeaturesComponent {

}

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Menu } from '../../components/menu/menu';


@Component({
  selector: 'app-main-layout',
  imports: [RouterModule, Menu],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {

}

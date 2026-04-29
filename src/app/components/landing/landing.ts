import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import ScrollReveal from 'scrollreveal';
import { EmpresaService } from '../../services/empresa-service';

@Component({
  selector: 'app-landing',
  imports: [RouterLink],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {

  constructor(
    private empresaService: EmpresaService
  ) {}
  
  ngOnInit() {

    this.empresaService.obtenerNumEmpresas().subscribe(num => {
      const numEmpresasElement = document.querySelector('.content-1-numEmpresas');

      if (numEmpresasElement) {
        numEmpresasElement.textContent = `${num} empresas`;
      }
    });

    this.scrollReveal();

  }

  scrollReveal() {
    const sr = ScrollReveal({
      reset: false, // cambia a true si quieres repetir animaciones
      viewFactor: 0.2
    });

    // HEADER
    sr.reveal('.sr-fade-down', {
      origin: 'top',
      distance: '20px',
      duration: 600
    });

    // HERO (content-1)
    sr.reveal('.sr-left', {
      origin: 'left',
      distance: '60px',
      duration: 900
    });

    sr.reveal('.sr-right', {
      origin: 'right',
      distance: '60px',
      duration: 900,
      delay: 200
    });

    sr.reveal('.sr-fade', {
      opacity: 0,
      duration: 700,
      delay: 200
    });

    sr.reveal('.sr-card', {
      origin: 'bottom',
      distance: '40px',
      duration: 800,
      interval: 150
    });

    sr.reveal('.sr-zoom', {
      scale: 0.85,
      duration: 700,
      easing: 'ease-in-out'
    });
  }
}
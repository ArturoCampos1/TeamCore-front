import { Component } from '@angular/core';
import ScrollReveal from 'scrollreveal';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {

  ngOnInit() {

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
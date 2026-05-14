import { ChangeDetectorRef, Component } from '@angular/core';
import { JwtResponse, Usuario } from '../../../../../../models/models';
import { AuthService } from '../../../../../../services/auth-service';
import { UsuarioService } from '../../../../../../services/usuario-service';
import { NgFor, NgIf} from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ver-usuarios',
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './ver-usuarios.html',
  styleUrl: './ver-usuarios.css',
})
export class VerUsuarios {

  mensaje = '';
  usuarioLogado: JwtResponse | null = null;
  usuarios: Usuario[] = [];

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {

    this.usuarioLogado = this.authService.getUsuarioLogado();

    if (!this.usuarioLogado) return;

    this.usuarioService.findUsuarioByEmpresa(this.usuarioLogado.idEmpresa).subscribe({
      next: (data: Usuario[]) => {
        this.usuarios = data;
        this.cd.detectChanges();
      },
      error: () => {
        this.mensaje = 'Usuarios no encontrados';
      }
    });
  }

  deleteUsuario(idUsuario: number){

    if (this.usuarioLogado?.idUsuario === idUsuario) {
      alert("No te puedes borrar")
    } else{
      this.usuarioService.deleteById(idUsuario);
      this.ngOnInit()
    }
  }
}
export interface Empresa {
  idEmpresa?: number;
  nombreEmpresa?: string;
  urlPhoto?: string;
  cif?: string;
  areaTrabajo?: string;
  fechaSalida?: string; 
  datos?: string;
  sedes?: Sede[];
}

export interface Sede {
  idSede?: number;
  nombreSede: string;
  direccion?: string;
  pais?: string;
  ciudad?: string;
  codPostal?: string;
  empresa?: Empresa;
  latitud: string;
  longitud: string;
}

export interface Usuario {
  idUsuario?: number;
  empresa?: { idEmpresa: number };

  nombreUsuario: string;
  dni: string;
  password: string;

  puesto?: string;
  correo?: string;
  numeroTelefono?: string;
  direccion?: string;

  IBAN?: string;
  numSeguridadSocial?: string;

  salarioBruto?: number;
  horasSemanales?: number;
  diasVacacionesDisponibles?: number;

  fechaEntrada?: string; // LocalDate -> string (YYYY-MM-DD)
  fechaSalida?: string;

  rol?: Rol;
}

export interface RegistroData {
  usuario?: Usuario;
  empresa?: Empresa;
  sede?: Sede;
}

export interface Rol {
  idRol?: number;
  nombreRol: string;
  permisos?: Permiso[];
}

export interface Permiso {
  idPermiso?: number;
  nombrePermiso: string;
  descripcion: string;
}

export interface JwtResponse {
  token: string;
  dni: string;
  idEmpresa: number;
  nombreEmpresa: string;
  idUsuario: number;
  nombre: string;
  iniciales: string;
  rol: string;
}

export interface AdminData {
  numEmpleados: number;
  proyectos: number;
  tareasPendientes: number;
  solicitudVacaciones: number;
}
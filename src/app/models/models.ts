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
}

export interface Usuario {
  idUsuario?: number;

  nombreUsuario: string;
  dni: string;
  password: string;

  puesto?: string;
  urlPhoto?: string;
  correo?: string;
  numeroTelefono?: string;
  direccion?: string;

  iban?: string;
  numSeguridadSocial?: string;

  salarioBruto?: number;
  horasSemanales?: number;
  diasVacacionesDisponibles?: number;

  fechaEntrada?: string; // LocalDate -> string (YYYY-MM-DD)
  fechaSalida?: string;

  empleadoActivo?: boolean;

  nominas?: Nomina[];
  roles?: Rol[];
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

export interface Nomina {
  idNomina?: number;

  nombreNomina: string;
  salarioMensual: number;

  fechaGeneracion: string; // LocalDate -> string (YYYY-MM-DD)

  usuario?: Usuario;
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
  nombre: string;
  rol: string;
}
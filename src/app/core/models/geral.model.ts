export interface AuthResponse {
  token: string;
}

export interface Endereco {
  enderecoId: number;
  andar: string;
  sala: string;
  departamento: string;
}

export interface Login {
  email: string;
  senha: string;
}

export interface Usuario {
  usuarioId: number;
  nome: string;
  email: string;
  senha: string;
  perfil: string;
  contato: string;
  endereco: Endereco;
}

export interface UsuarioGET {
  usuarioId: number;
  nome: string;
  email: string;
  senha: string;
  perfil: string;
  contato: string;
  endereco: Endereco;
}

export interface UsuarioPOST {
  nome: string;
  email: string;
  senha: string;
  perfil: string;
  contato: string;
  endereco: Endereco;
}

export interface UsuarioPUT {
  usuarioId: number;
  nome: string;
  email: string;
  senha: string;
  perfil: string;
  contato: string;
  endereco: Endereco;
}

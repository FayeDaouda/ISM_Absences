export interface User{
  id: string,
  createdAt: string,
  updatedAt: string,
  nom: string,
  prenom: string,
  login: string,
  motDePasse: string,
  photo: string,
  role: Role,
}

export type Role = 'ETUDIANT' |'ADMIN' | 'VIGILE';

export interface LoginResponse {
    message: string,
    success:boolean,
    data :User|null
}
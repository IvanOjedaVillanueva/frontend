import { usuario } from "./usuario";

export interface servidor {
    uuid_servidor?:string;
    nombre_de_servidor: string;
    usuarios:usuario[];
    admin?:usuario;
}
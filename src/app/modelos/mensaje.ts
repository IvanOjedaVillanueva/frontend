import { usuario } from "./usuario";

export interface Mensaje {
    usuario_enviador: usuario;
    mensaje: string;
}
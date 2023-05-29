import { usuario } from "./usuario";

export interface canalPrivado {
    uuid_canalPrivado?:string;
    nombre_de_canal: string;
    usuarios?:usuario[];
}
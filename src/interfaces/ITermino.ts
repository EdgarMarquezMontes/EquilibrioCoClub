export interface ITermino {
  slug: string;
  hangul: string;
  romanizacion: string;
  significado: string;
  categoria: string;
  descripcion: string;
  pasos: string[];
  idVideo?: string;
}

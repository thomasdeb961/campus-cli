// Une catégorie limitée à trois valeurs (type union)
export type Category = "informatique" | "livre" | "maison";

// Forme d'un produit. Le "?" rend la description facultative.
export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  category: Category;
}

// Erreur métier : une classe qui étend Error, avec un nom qui dit ce qui s'est passé
export class ProductNotFoundError extends Error {
  constructor(id: number) {
    super(`Produit ${id} introuvable`); // super() appelle le constructeur de Error
  }
}

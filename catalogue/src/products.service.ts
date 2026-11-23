// On importe en .js : c'est le nom du fichier que tsc produira dans dist/
import { ProductNotFoundError, type Product } from "./product.js";
import type { Logger } from "./logger.js";

export class ProductsService {
  // private : personne en dehors de la classe ne peut toucher au tableau
  private readonly products: Product[] = [];

  // Propriété de paramètre : déclare this.logger et l'affecte en une fois.
  // Le logger est REÇU (injection de dépendances), pas créé ici.
  constructor(private readonly logger: Logger) {}

  create(product: Product): Product {
    this.products.push(product);
    this.logger.log(`${product.name} créé`);
    return product;
  }

  findAll(): Product[] {
    return [...this.products]; // une copie : le tableau privé reste protégé
  }

  findOne(id: number): Product {
    const product = this.products.find((p) => p.id === id);
    if (product === undefined) throw new ProductNotFoundError(id);
    return product; // ici, forcément un Product
  }
}

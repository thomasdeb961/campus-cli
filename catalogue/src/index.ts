import { ConsoleLogger, SilentLogger, TimestampLogger, type Logger } from "./logger.js";
import { ProductNotFoundError } from "./product.js";
import { ProductsService } from "./products.service.js";

// La seule ligne à changer pour changer de logger :
// new SilentLogger() (rien n'est affiché) ou new TimestampLogger() (avec l'heure)
const logger: Logger = new ConsoleLogger();

// C'est ici qu'on crée le logger et qu'on le donne au service (NestJS le fera pour nous)
const service = new ProductsService(logger);

service.create({ id: 1, name: "Clavier", price: 39.9, description: "Clavier AZERTY sans fil", category: "informatique" });
service.create({ id: 2, name: "Souris", price: 19.5, category: "informatique" }); // sans description
service.create({ id: 3, name: "Le Petit Prince", price: 8.9, description: "Roman d'Antoine de Saint-Exupéry", category: "livre" });

const arg = process.argv[2];

if (arg === undefined) {
  // Sans argument : on liste tous les produits
  const names = service.findAll().map((p) => p.name);
  console.log(`Produits : ${names.join(", ")}`);
} else {
  try {
    const product = service.findOne(Number(arg));
    console.log(`Nom : ${product.name}`);
    console.log(`Prix : ${product.price} €`);
    console.log(`Description : ${product.description ?? "Pas de description"}`);
  } catch (error) {
    // On ne rattrape que l'erreur qu'on sait traiter, les autres remontent
    if (error instanceof ProductNotFoundError) console.log(error.message);
    else throw error;
  }
}

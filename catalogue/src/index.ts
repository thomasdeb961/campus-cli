// Pour aller plus loin : une catégorie limitée à trois valeurs (type union)
type Category = "informatique" | "livre" | "maison";

// Forme d'un produit. Le "?" rend la description facultative.
interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  category: Category;
}

// 5 produits, dont un sans description (id 2)
const products: Product[] = [
  { id: 1, name: "Clavier", price: 39.9, description: "Clavier AZERTY sans fil", category: "informatique" },
  { id: 2, name: "Souris", price: 19.5, category: "informatique" },
  { id: 3, name: "Écran 27 pouces", price: 229, description: "Écran IPS 1440p", category: "informatique" },
  { id: 4, name: "Le Petit Prince", price: 8.9, description: "Roman d'Antoine de Saint-Exupéry", category: "livre" },
  { id: 5, name: "Lampe de bureau", price: 54, description: "Lampe LED orientable", category: "maison" },
];

// Renvoie le produit trouvé, ou undefined s'il n'existe pas
function findById(products: Product[], id: number): Product | undefined {
  return products.find((product) => product.id === id);
}

// Renvoie les produits strictement moins chers que max
function cheaperThan(products: Product[], max: number): Product[] {
  return products.filter((product) => product.price < max);
}

// npm start -- 2  ->  process.argv[2] vaut "2" (une chaîne), on la convertit en nombre
const id = Number(process.argv[2]);
const product = findById(products, id);

if (product === undefined) {
  console.log(`Produit ${process.argv[2]} introuvable`);
} else {
  console.log(`Nom : ${product.name}`);
  console.log(`Prix : ${product.price} €`);
  console.log(`Description : ${product.description ?? "Pas de description"}`);
}

const cheapNames = cheaperThan(products, 50).map((product) => product.name);
console.log(`Produits à moins de 50 € : ${cheapNames.join(", ")}`);

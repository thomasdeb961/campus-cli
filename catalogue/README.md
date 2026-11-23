# catalogue — bases de TypeScript et service prêt pour NestJS

Catalogue de produits en TypeScript, compilé avec `tsc`, **sans aucun `any`**.

## Lancer

```bash
npm install
npm start          # liste les produits
npm start -- 2     # affiche le produit 2
npm start -- 99    # « Produit 99 introuvable », sans planter
```

Sortie de `npm start -- 2` :

```
[log] Clavier créé
[log] Souris créé
[log] Le Petit Prince créé
Nom : Souris
Prix : 19.5 €
Description : Pas de description
```

## Organisation (exercice 01.3 : un fichier par rôle)

| Fichier | Rôle |
|---------|------|
| `src/product.ts` | `interface Product`, `type Category` et l'erreur `ProductNotFoundError` (qui étend `Error`) |
| `src/logger.ts` | `interface Logger` et ses implémentations : `ConsoleLogger`, `SilentLogger`, `TimestampLogger` (bonus) |
| `src/products.service.ts` | `ProductsService` : tableau **privé** de produits, `Logger` **reçu par le constructeur**, méthodes `create`, `findAll`, `findOne` |
| `src/index.ts` | Crée le logger et le service, ajoute 3 produits, lit l'argument et rattrape `ProductNotFoundError` avec `try/catch` |

- **Injection de dépendances** : le service ne fait pas `new ConsoleLogger()` lui-même, il reçoit
  un `Logger` dans son constructeur. On peut donc lui en donner un autre sans toucher au service.
- **Changer de logger en une ligne** (`src/index.ts`) :
  ```ts
  const logger: Logger = new ConsoleLogger();   // affiche "[log] Clavier créé"
  const logger: Logger = new SilentLogger();    // n'affiche rien
  const logger: Logger = new TimestampLogger(); // affiche "[16:47:20] Clavier créé"
  ```
- **Erreur métier** : `findOne` renvoie toujours un `Product` ou lance `ProductNotFoundError`.
  L'appelant n'a plus à tester `undefined` ; seul `index.ts`, qui sait quoi faire, la rattrape.
- **Imports en `.js`** : `import ... from "./product.js"` même si le fichier s'appelle `product.ts`,
  car c'est le nom du fichier que `tsc` produit dans `dist/`.

### Erreurs vérifiées avec `tsc` (TypeScript 6.0.3)

| Erreur provoquée | Message | Code |
|------------------|---------|------|
| `SilentLogger` sans sa méthode `log` | Class 'SilentLogger' incorrectly implements interface 'Logger'. | **TS2420** |
| `service.products` depuis `index.ts` | Property 'products' is private and only accessible within class 'ProductsService'. | **TS2341** |
| Import sans `.js` (`"./products.service"`) | Cannot find module './products.service' or its corresponding type declarations. | **TS2307** (TS2835 dans les versions précédentes de TypeScript) |

## Configuration

- `devDependencies` : `typescript@6` (le compilateur `tsc`) et `@types/node@26` (types de Node,
  par ex. `process.argv`) : ils servent à compiler, pas à exécuter.
- `tsconfig.json` : `strict: true`, sources dans `src/`, JavaScript compilé dans `dist/`
  (ignoré par git, comme `node_modules/`).

## Exercice 01.2 : les trois erreurs provoquées

| Erreur | Code modifié | Message de `tsc` | Code TS |
|--------|--------------|------------------|---------|
| Faute de frappe | `product.nme` | Property 'nme' does not exist on type 'Product'. Did you mean 'name'? | **TS2551** |
| Mauvais type | `price: "19.5"` | Type 'string' is not assignable to type 'number'. | **TS2322** |
| Absence non traitée | `product.name` sans vérifier `undefined` | 'product' is possibly 'undefined'. | **TS18048** |
| *(bonus)* Catégorie invalide | `category: "jardin"` | Type '"jardin"' is not assignable to type 'Category'. | **TS2322** |

Ces erreurs sont détectées **à la compilation**, avant d'exécuter le programme.

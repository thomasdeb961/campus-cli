# catalogue — Exercice 01.2 (bases de TypeScript)

Premier programme TypeScript, compilé avec `tsc`, **sans aucun `any`**.

## Lancer

```bash
npm install
npm start -- 2     # compile (tsc) puis exécute dist/index.js avec l'id 2
```

Sortie :

```
Nom : Souris
Prix : 19.5 €
Description : Pas de description
Produits à moins de 50 € : Clavier, Souris, Le Petit Prince
```

`npm start -- 42` affiche `Produit 42 introuvable`.

## Contenu

- `devDependencies` : `typescript@6` (le compilateur `tsc`) et `@types/node@26`
  (les types de Node, par ex. `process.argv`). Ce sont des dépendances de
  **développement** : elles servent à compiler, pas à exécuter `dist/index.js`.
- `tsconfig.json` : `strict: true`, code source dans `src/`, JavaScript compilé dans `dist/`
  (ignoré par git).
- `src/index.ts` :
  - `interface Product` : `id`, `name`, `price`, `description?` (facultative), `category` ;
  - 5 produits, dont un sans description ;
  - `findById(products, id): Product | undefined` ;
  - `cheaperThan(products, max): Product[]`.
- **Pour aller plus loin** : `type Category = "informatique" | "livre" | "maison"`
  (type union : seules ces trois valeurs sont acceptées).

## Les trois erreurs provoquées (question 6)

| Erreur | Code modifié | Message de `tsc` | Code TS |
|--------|--------------|------------------|---------|
| Faute de frappe | `product.nme` | Property 'nme' does not exist on type 'Product'. Did you mean 'name'? | **TS2551** |
| Mauvais type | `price: "19.5"` | Type 'string' is not assignable to type 'number'. | **TS2322** |
| Absence non traitée | `product.name` sans vérifier `undefined` | 'product' is possibly 'undefined'. | **TS18048** |
| *(bonus)* Catégorie invalide | `category: "jardin"` | Type '"jardin"' is not assignable to type 'Category'. | **TS2322** |

Ces erreurs sont détectées **à la compilation**, avant d'exécuter le programme.
En JavaScript, elles ne seraient apparues qu'à l'exécution (`undefined` affiché, ou plantage).

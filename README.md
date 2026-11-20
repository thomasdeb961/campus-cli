# campus-cli

Petit outil en ligne de commande (Node.js, modules ES) qui souhaite la bienvenue
à une personne, affiche son identifiant (généré avec `slugify`) et la date du jour
en français.

## Lancer le projet

```bash
npm install                    # installe les dépendances (versions figées par package-lock.json)
npm start -- "Thomas Débé"     # le "--" transmet l'argument au script
npm start                      # sans argument -> "inconnu"
```

Exemple de sortie :

```
Bienvenue au campus, Thomas Débé
Ton identifiant : thomas-debe
Nous sommes le vendredi 20 novembre 2026
```

Autres scripts : `npm run dev` (relance auto avec `node --watch`), `npm run versions`.

---

## Exercice 01.1

### Q2. Plages de versions : `^1.6.9` et `~1.6.9`

Vérifié avec `npx semver -r '<plage>' <versions...>` (paquet lancé via npx,
**non ajouté** aux dépendances du projet).

| Version | `^1.6.9` (>=1.6.9 <2.0.0) | `~1.6.9` (>=1.6.9 <1.7.0) |
|---------|:-------------------------:|:-------------------------:|
| 1.6.2   | ❌ (trop ancienne)          | ❌ (trop ancienne)          |
| 1.6.12  | ✅                          | ✅                          |
| 1.7.0   | ✅                          | ❌ (mineure différente)     |
| 1.10.0  | ✅                          | ❌ (mineure différente)     |
| 2.0.0   | ❌ (majeure différente)     | ❌ (majeure différente)     |

- **Caret `^`** : accepte les mises à jour *mineures* et *correctives* (même majeure `1`).
- **Tilde `~`** : accepte seulement les mises à jour *correctives* (même `1.6`).
- **1.6.2 est refusée** car elle est *inférieure* à 1.6.9 : les deux plages fixent un minimum.
- **1.10.0 > 1.7.0** : les versions se comparent nombre par nombre (10 > 7),
  pas comme du texte (où "1.10" serait avant "1.7").
- `package.json` décrit une **plage** acceptée ; `package-lock.json` **fige la version
  exacte installée** (ici `slugify` 1.6.9, avec son URL et son empreinte `integrity`),
  pour que tout le monde installe exactement la même chose.

### Q3. Faut-il un paquet pour un identifiant aléatoire ? Une date en français ?

**Non**, Node.js et JavaScript le font déjà :

```js
// Identifiant aléatoire : module crypto intégré à Node
crypto.randomUUID(); // ex. "e90c8b1d-140f-4254-8d68-47c9123faef0"

// Date en français : API Intl (voir MDN, Date.prototype.toLocaleDateString)
new Date().toLocaleDateString("fr-FR", {
  weekday: "long", day: "numeric", month: "long", year: "numeric",
}); // "vendredi 20 novembre 2026"
```

Testé avec :

```bash
node -e 'console.log(crypto.randomUUID())'
node -e 'console.log(new Date().toLocaleDateString("fr-FR",{weekday:"long",day:"numeric",month:"long",year:"numeric"}))'
```

**Pourquoi moins de dépendances, c'est mieux** : moins de code tiers à qui faire
confiance (sécurité, attaques de la chaîne d'approvisionnement), moins de mises à jour
à suivre, un `node_modules` plus léger et pas de risque qu'un paquet soit abandonné.

### Q4. Paquet npm pour afficher « il y a 3 jours » (noms proposés par une IA)

Vérifié sur le registre npm le 20/11/2026 avec
`npm view <paquet> version` et `npm view <paquet> "time[<version>]"`
(date de publication de la dernière version).

| Paquet               | Existe ? | Dernière version (date)  | Remarque |
|----------------------|:--------:|--------------------------|----------|
| date-fns             | ✅ | 4.4.0 (29/05/2026)  | Maintenu, très utilisé |
| dayjs                | ✅ | 1.11.23 (17/08/2026) | Maintenu, léger |
| timeago.js           | ✅ | 4.3.1 (12/11/2026)  | Maintenu |
| javascript-time-ago  | ✅ | 2.6.4 (28/02/2026)  | Maintenu |
| moment               | ✅ | 2.31.0 (15/09/2026) | En « maintenance mode » (cf. momentjs.com, *Project Status*) : déconseillé pour un nouveau projet |
| timeago              | ✅ | 1.6.7 (23/04/2019)  | Plus de nouvelle version depuis 2019 |
| time-ago-fr          | ❌ | — (erreur 404)       | **N'existe pas** : nom inventé par l'IA |

⚠️ Un nom inventé par une IA est dangereux : quelqu'un de malveillant peut publier
un paquet sous ce nom (« slopsquatting ») et il serait installé sans méfiance.
Toujours vérifier qu'un paquet existe, qui le publie et s'il est maintenu.

**Conclusion : pas besoin de paquet.** `Intl.RelativeTimeFormat` est intégré :

```js
new Intl.RelativeTimeFormat("fr", { numeric: "auto" }).format(-3, "day");
// "il y a 3 jours"
```

Testé avec `node -e 'console.log(new Intl.RelativeTimeFormat("fr",{numeric:"auto"}).format(-3,"day"))'`.

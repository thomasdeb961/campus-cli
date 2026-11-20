import slugify from "slugify";

// Prénom passé en argument, ou "inconnu" si aucun argument
const name = process.argv[2] ?? "inconnu";
console.log(`Bienvenue au campus, ${name}`);

// Identifiant : minuscules, sans accents ni caractères spéciaux
const id = slugify(name, { lower: true, strict: true });
console.log(`Ton identifiant : ${id}`);

// Bonus : date du jour en français
const today = new Date().toLocaleDateString("fr-FR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});
console.log(`Nous sommes le ${today}`);

const name = process.argv[2];
console.log(`Bienvenue au campus, ${name}`);

// Bonus : date du jour en français
const today = new Date().toLocaleDateString("fr-FR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});
console.log(`Nous sommes le ${today}`);

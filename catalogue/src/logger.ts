// Le contrat : tout logger doit avoir une méthode log
export interface Logger {
  log(message: string): void;
}

// implements : tsc vérifie que la classe respecte bien l'interface
export class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(`[log] ${message}`);
  }
}

// N'affiche rien : utile en test
export class SilentLogger implements Logger {
  log(message: string): void {}
}

// Pour aller plus loin : préfixe chaque message de l'heure
export class TimestampLogger implements Logger {
  log(message: string): void {
    const time = new Date().toLocaleTimeString("fr-FR");
    console.log(`[${time}] ${message}`);
  }
}

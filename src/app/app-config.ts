import { InjectionToken } from "@angular/core";

export interface AppConfig {
  apiUrl: string;
  courseCacheSize: number;
}

export const APP_CONFIG: AppConfig = {
  apiUrl: "http://localhost:9000",
  courseCacheSize: 10,
};

// exemplo de injeção de dependência de um objeto do javascript (qualquer coisa que não seja uma classe)
// E ainda usando a abordagem Tree-Shakeable, (se a dependência não for chamada no construtor de nenhum service/component ela não é adicionada no bundle)
export const CONFIG_TOKEN = new InjectionToken<AppConfig>("CONFIG_TOKEN", {
  providedIn: "root",
  factory: () => APP_CONFIG,
});

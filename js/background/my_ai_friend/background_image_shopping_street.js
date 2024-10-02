import { Background } from "../background.js";

export const backgroundImageShoppingStreet = new Background({
  names: {
    English: "Shopping Street",
    日本語: "近所の商店街",
    Hindi: "खरीदारी के लिए बनी सड़क",
    Spanish: "Calle de Compras",
    Italian: "Via Dello Shopping",
    German: "Einkaufsstraße",
    French: "Rue Commerçante",
  },
  url: 'url("../image/shopping_street.png")',
  prompts: {
    English:
      "Let's chat new stores in the city and some gosships around the city.",
    日本語: "街の新しい店や、街の周りのゴシップについて話しましょう。",
    Hindi: "आइए शहर में नए स्टोर और शहर के चारों ओर कुछ गपशप करें।",
    Spanish:
      "Hablemos de las nuevas tiendas de la ciudad y de algunos chismes por la ciudad.",
    Italian:
      "Parliamo dei nuovi negozi della città e di alcuni pettegolezzi in giro per la città.",
    German:
      "Lassen Sie uns über neue Geschäfte in der Stadt und einige Gossips in der Stadt plaudern.",
    French:
      "Parlons des nouveaux magasins de la ville et de quelques potins autour de la ville.",
  },
  type: "image",
  backdropFilter: "blur(1.5px)",
});

import { Background } from "../background.js";

export const backgroundImageSchoolEntranceGate = new Background({
  names: {
    English: "School Entrance Gate",
    日本語: "学校の校門",
    Hindi: "स्कूल के प्रवेश द्वार",
    Spanish: "Puerta de entrada a la escuela",
    Italian: "Ingresso della scuola",
    German: "Schultor",
    French: "Porte d'entrée de l'école",
  },
  url: 'url("../image/school0.png")',
  prompts: {
    English:
      "Let's chat today's study schedule and small gosships about the classmate and teachers.",
    日本語:
      "今日の勉強の予定や、クラスメイトや先生のちょっとしたゴシップについて話しましょう。",
    Hindi:
      "आज के अध्ययन कार्यक्रम और कक्षा के साथी और शिक्षकों के बारे में छोटी-छोटी बातें करते हैं।",
    Spanish:
      "Hablemos del horario de estudio de hoy y de los pequeños chismes sobre los compañeros de clase y los profesores.",
    Italian:
      "Parliamo dell'orario di studio di oggi e delle piccole chiacchiere sui compagni di classe e sugli insegnanti.",
    German:
      "Lassen Sie uns über den heutigen Studienplan und die kleinen Gossips über die Klassenkameraden und Lehrer sprechen.",
    French:
      "Parlons de l'horaire d'étude d'aujourd'hui et des petits potins sur les camarades de classe et les professeurs.",
  },
  type: "image",
  backdropFilter: "blur(1.5px)",
});

import { Background } from "../background.js";

export const backgroundImageSchoolClassroom = new Background({
  names: {
    English: "Classroom in the School",
    日本語: "学校の教室",
    Hindi: "स्कूल में कक्षा",
    Spanish: "Aula de la escuela",
    Italian: "Aula della scuola",
    German: "Klassenzimmer in der Schule",
    French: "Salle de classe de l'école",
  },
  url: 'url("../image/school2.png")',
  prompts: {
    English:
      "Let's chat about today's study schedule and small gossip about classmates and teachers.",
    日本語:
      "今日の勉強の予定や、クラスメイトや先生のちょっとしたゴシップについて話しましょう。",
    Hindi:
      "आइए आज के अध्ययन कार्यक्रम और सहपाठियों और शिक्षकों के बारे में छोटी-छोटी बातें करें।",
    Spanish:
      "Charlemos sobre el horario de estudio de hoy y pequeños chismes sobre compañeros y profesores.",
    Italian:
      "Parliamo del programma di studio di oggi e di piccoli pettegolezzi su compagni di classe e insegnanti.",
    German:
      "Lasst uns über den heutigen Studienplan und kleinen Klatsch über Klassenkameraden und Lehrer plaudern.",
    French:
      "Discutons du programme d'études d'aujourd'hui et de petits potins sur les camarades de classe et les professeurs.",
  },
  type: "image",
  backdropFilter: "blur(1.5px)",
});

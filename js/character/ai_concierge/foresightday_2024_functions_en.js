import { Function } from "../../function/function.js";
import { Parameter } from "../../function/parameter.js";
import { ArrayParameter } from "../../function/array_parameter.js";
import { ChatGPTFunction } from "../../function/common_functions/chatgpt_function.js";
import { Prompt } from "../prompt.js";
import { apiKeys } from "../../apikeys.js";
import { Util } from "../../util.js";

class EventTimetableFunctionEnglish extends Function {
  constructor({ name, description, parameters }) {
    super({
      name: name,
      description: description,
      parameters: parameters,
    });
  }

  createModalContentsForSession(session) {
    if (!session.presenters && (!session.abstract || session.abstract == "")) {
      return "";
    }

    // Create the content string.
    var contentStr = `<article class="message is-info"><div class="message-header">${session.title} (${session.begin} - ${session.end})</div>`;
    var presenters = `<div class="message-body">`;

    if (session.presenters) {
      for (var presenter of session.presenters) {
        presenters += `<p class="is-size-7">${presenter.name ?? ""} ${
          presenter.affliation ?? ""
        } (${presenter.title ?? ""})</p>`;
      }
      if (presenters !== "") {
        contentStr += presenters;
      }
    }
    if (session.abstract && session.abstract != "") {
      contentStr += `<p class="is-size-7 has-text-grey-light">${session.abstract}</p>`;
    }
    contentStr += `</div></article>`;
    return contentStr;
  }

  async onAvatarTalk({ result, document }) {
    super.onAvatarTalk({ result: result, document: document });
    if (result == null || result.length == 0 || document == null) {
      return;
    }

    var contentStr = "";
    for (var key in result) {
      contentStr += this.createModalContentsForSession(result[key]);
    }
    if (contentStr == "") {
      return;
    }
    Util.showModalDialog({
      document: document,
      title: "Session Details",
      content: contentStr,
    });
  }

  static eventInfo = {
    name: "NTT DATA Foresight Day 2024",
    theme:
      "In anticipation of the dramatic changes in society and industry brought about by technological evolution, we will chart a course from a multifaceted perspective and bring about innovation in the world. NTT DATA will take on the challenge of change with FORESIGHT (foresight) based on the technology and knowledge it has cultivated globally. We have all the power to imagine and implement the future here. We will lead this era of change by utilizing FORESIGHT in business, technology, and sustainability. Together, we will move towards an exciting future, like looking through a kaleidoscope. We look forward to seeing you there.",
    venue: "ANA InterContinental Tokyo, basement floor 1",
    organizer: "NTT DATA Corporation",
    date: new Date(2024, 1, 26),
    begin: "10:00",
    end: "17:30",
    fee: 0,
    currency: "JPY",
  };

  static timeTable = {
    "Keynote Speech K-01": {
      title:
        "Open the future. Passion for solving social issues and the stirrings of change",
      begin: "10:00",
      end: "10:50",
      abstract:
        'A special session featuring Taka Nakamura of taliki Inc., a new generation player in solving social problems. As society and business continue to optimize, social issues are becoming more complex and being left behind as "distortions." How can companies face these issues, solve them, and create value? What is the future vision for social and business transformation that will emerge from co-creation across business fields and generations to approach unsolved issues? We will explore the path forward through a dialogue between two leaders from different generations and fields.',
      presenters: [
        {
          name: "Taka Nakamura",
          affiliation: "taliki, Inc.",
          title: "CEO and Managing Partner of taliki Fund",
          career:
            "A graduate of Kyoto University, she built two schools in Cambodia while in college. She then studied abroad in New York, where she worked for a local news station and covered the 2016 presidential election and the United Nations General Assembly. After returning to Japan, she founded taliki Inc. While incubating over 250 social entrepreneurs and promoting open innovation for listed companies, in 2020 she founded a VC to solve social issues as the youngest female representative in Japan and is also engaged in investment activities.",
        },
        {
          name: "Yu Sasaki",
          affiliation: "NTT DATA",
          title: "President and CEO",
          career:
            "Joined NTT Data Communications (now NTT Data) in 1990. From 2023, he will be the Executive Vice President and Representative Director of NTT Data Group and President and Representative Director of NTT Data. Prior to his current position, he was a project manager for multiple large-scale projects, and was appointed Executive Officer in 2016. Since then, he has led businesses as the head of the solutions business division and the manufacturing industry business. He completed his Master's degree in Mechanical Engineering at the Graduate School of Engineering, The University of Tokyo.",
        },
      ],
    },
    "Special Lecture S-02": {
      title:
        "The spread of change: How global manufacturing has changed how it makes money, how it operates, and how it utilizes its people.",
      begin: "13:00",
      end: "13:50",
      abstract:
        'Many companies are promoting "reform" in their management policies and are working on it. However, it has been a long time since warnings were sounded about Japan\'s declining international competitiveness, and we believe that there is still more we can do in terms of the execution and scope of reform. Through case studies of Western companies that are making bold "reforms," ​​we will consider what makes us different and what we can do to spread the "reform."',
      presenters: [
        {
          name: "Isao Arima",
          affliation: "NTT DATA",
          title: "Executive Vice President",
        },
      ],
    },
    "Special Lecture S-03": {
      title:
        "Latest technology trends that will transform business - NTT DATA Technology Foresight 2024 -",
      begin: "15:00",
      end: "15:50",
      abstract:
        'NTT DATA Technology Foresight is a report that proposes current and future trends that are constantly changing, with a focus on technology and business. In this presentation, we will introduce some of the main points from the latest edition, which brings together NTT DATA\'s global research and analytical capabilities. In addition, we will show you technologies under development and discuss how our predictions are being realized. As the evolution of information technology accelerates and is integrated with business to increase value, the importance of understanding its essence is only increasing. Please check out the latest edition of Foresight, which is now in its 13th year as a "compass" for discussing future strategies with customers.',
      presenters: [
        {
          name: "Hidehiko Tanaka",
          affliation: "NTT DATA Group Technology and Innovation Headquarters",
          title:
            "Executive Officer, Head of Technology and Innovation Headquarters",
        },
      ],
    },
    "Special Lecture S-01": {
      title:
        "The forefront of sustainability business: The latest trends overseas and the mechanisms for business emergence in Japan, a country facing advanced challenges",
      begin: "11:00",
      end: "11:50",
      abstract:
        'Companies are now being asked how to address sustainability, not just as part of their contribution to society, but from business activities to management, and how to contribute to solving social issues and the global environment. What is important for this is "solving social issues through business" and "social innovation design," which aims to create businesses from social issues. In this presentation, we will first introduce the latest examples of solving social issues through business both in Japan and overseas. In addition, we will talk about the reality of creating businesses from social issues, while introducing specific examples of "social innovation design" that NTT DATA is working on in Japan, a country that is advanced in facing challenges.',
      presenters: [
        {
          name: "Yoshiko Ikeda",
          affliation: "NTT DATA Group Corporate Headquarters",
          title:
            "Executive Officer, Head of Sustainability Management Promotion Department",
        },
        {
          name: "Masashi Hamaguchi",
          affliation: "NTT Data Social Design Promotion Office",
          title: "Executive Officer, Head of Social Design Promotion Office",
        },
        {
          name: "Koichi Kaneda",
          affliation: "NTT DATA Group Corporate Headquarters",
          title:
            "Sustainability Management Promotion Department Senior Specialist",
        },
      ],
    },
    "Special Lecture S-05": {
      title:
        "Digital Transformation Roadmap - Special seminar by leading digital strategy expert to launch the latest best-selling book -",
      begin: "16:00",
      end: "16:50",
      abstract:
        'Many companies are promoting the introduction of DX, but it is said that about 70% of them fail. Professor David Rogers of Columbia Business School\'s previous book, "Digital Transformation Playbook" (2016), focused on how to introduce DX and became a global bestseller as a practical guide to DX. In his latest book, "Digital Transformation Roadmap," published in August 2023, he delves into the practical theory of concretely leading DX to success through a five-step "DX roadmap." In this special lecture by the author prior to the publication of the Japanese version, the author himself will explain the contents of his new book. From the latest frameworks and use cases related to DX, you can learn about suggestions for Japanese companies and practical DX theories that can be used immediately. Simultaneous Japanese interpretation will be provided.',
      presenters: [
        {
          name: "David Rogers",
          affliation: "Columbia Business School",
          title: "Professor",
          career:
            "He is a professor at Columbia Business School specializing in digital transformation and digital business strategy, and is the faculty director of the Digital Business Strategy and Digital Leadership education program, which has taught over 25,000 executives. He has written five books on the subject and his work has had an influential impact around the world. He has also advised major companies such as Google, Citibank, Toyota, and GE on adapting to the digital age.",
        },
      ],
    },
    "Nikkei Special Lecture R-01": {
      title: 'The future of banking opens with "Connect & Trust"',
      begin: "11:00",
      end: "11:40",
      abstract:
        'As technological advances dramatically change the world, the era in which banks can continue to grow through their core business alone is coming to an end. The keywords for transformation to create new businesses are "Connect" and "Trust." "Connect" expresses the expectation that financial institutions, which have relationships with a wide range of businesses, will accelerate unprecedented combinations between industries, leading to the creation of new businesses. "Trust" shows the possibility that banks, which have cultivated trust and stability through money, can become trust anchors and provide new value in unknown areas transformed by technology. In this presentation, we will consider together what the future will look like for financial institutions in which Connect & Trust can be realized.',
      keywords: ["Consulting", "Finance"],
      presenters: [
        {
          name: "Tetsuo Iida",
          affliation: "Amazon Web Services Japan",
          title: "Head of Financial Business Development Division",
          career:
            'Since 2016, he has been in charge of business development in the financial field at Amazon Web Services Japan. In his previous job, he was in charge of developing and planning IT solutions for financial institutions, focusing on accounting and payment systems, at Information Services International-Dentsu, Ltd. He has also contributed to the expansion of the FinTech field in Japan, including through his involvement in Japan\'s first FinTech pitch contest, "FIBC." He is also the vice representative director of the Financial Innovation Association FINOVATORS.',
        },
        {
          name: "Hideo Yamamoto",
          affliation: "NTT Data Financial Innovation Headquarters",
          title: "General Manager, Innovation Leadership Division",
        },
      ],
    },
    "Nikkei Special Lecture R-03": {
      title:
        "Utilizing digital technology to build a highly resilient future: The perspective we should have as people living in Japan, a country prone to disasters",
      begin: "11:00",
      end: "11:40",
      abstract:
        'Due to the effects of climate change in recent years, the risk of natural disasters is increasing on a global scale. As disasters become more frequent, severe, and widespread, how can we prepare for risks and confront crises? In this regard, attention is being paid to "resilience." Japan is known worldwide as a "disaster-prone country," and the importance of resilience is increasing not only in the public sector but also in the business sector, with the aim of expanding disaster prevention measures overseas. This time, we will welcome weather forecaster and weather anchor Kimiji Saida, who will talk about the theme of "disaster prevention and resilience," and discuss recent environmental changes and their impact on corporate activities. Together, we will consider perspectives for countries, local governments, and companies to ensure resilience.',
      keywords: [
        "Data & Intelligence",
        "consulting",
        "Government agencies and local governments",
        "Disaster Prevention and Resilience",
      ],
      presenters: [
        {
          name: "Kimiji Saida",
          affliation: "Himmel Consulting",
          title: "Weather forecaster/weather anchor, CEO of Himmel Consulting",
          career:
            'Born in Tokyo in 1975. Majored in marine meteorology at Hokkaido University, and qualified as a weather forecaster while still a student. Disaster prevention specialist and first-class crisis management specialist. As a reporter, he has covered many disaster sites, including the 2003 Typhoon No. 10 and the Tokachi-oki earthquake. Wanting to prevent disasters before they happen, rather than just reporting on the damage, he decided to become a disaster prevention specialist. After gaining experience at a private weather company, he has been working as a weathercaster for NHK since 2006. He currently appears on "News Watch 9" and "Ashita wo Mamoru Navi", among others. He was in charge of meteorological research for the TV drama series "Okaeri Mone". In 2018, he founded Himmel Consulting Co., Ltd. He is a director of the NPO Weathercaster Network and chairman of the Outreach Subcommittee of the NICT Space Weather Users Council. He is active in many areas, including writing books and giving lectures.',
        },
        {
          name: "Akira Abe",
          affliation: "NTT Data Social DX Promotion Office",
          title: "Disaster Prevention and Resilience Promotion Section Chief",
        },
      ],
    },
    "Nikkei Special Lecture R-06": {
      title:
        "Sleep is the time to pay attention! The future of well-being realized through advanced technology",
      begin: "12:00",
      end: "12:40",
      abstract:
        'Since the COVID-19 pandemic, people\'s values ​​and lifestyles have changed dramatically, and health awareness has increased. For companies, too, concrete efforts to improve employee well-being are essential to recruiting and retaining talent and improving productivity. In this lecture, we have invited sleep consultant Nao Tomono to focus on the importance of sleep, which is often overlooked in Japan, and introduce advanced research and case studies that will lead to a world where everyone can get the sleep they need. In addition, we will propose an ecosystem that NTT DATA envisions to realize the well-being of consumers and employees, and introduce the "Healthcare Co-Creation Lab" as an initiative to experience the future and realize business co-creation.',
      keywords: [
        "Data & Intelligence",
        "IoT",
        "consulting",
        "finance",
        "Medical and Healthcare",
      ],
      presenters: [
        {
          name: "Nao Tomono",
          affliation: "SEA Trinity",
          title: "Representative Director",
          career:
            'He studies sleep in the fields of "social preventive medicine" and "social epidemiology," aiming to extend healthy lifespan and reduce health disparities. After learning about sleep scientifically from his own experience of losing over 15 kg and improving his physical condition by improving his own sleep, he is now teaching people across the country his method of good sleep without rebound.',
        },
        {
          name: "Takashi Yano",
          affliation: "NTT Data Insurance IT Services Division",
          title: "Strategic Design Department Head",
        },
      ],
    },
    "Nikkei Special Lecture R-10": {
      title:
        'Overcoming the "Logistics Crisis" - New Developments in Sustainable Logistics Strategies -',
      begin: "13:00",
      end: "13:40",
      abstract:
        'With the aging of drivers and the approaching cap on overtime work known as the 2024 problem, a "logistics crisis" has emerged as a real issue. This has made improving logistics efficiency a top priority in Japanese society. How to deal with the issue of truck driver shortages requires various measures, such as improving working conditions, streamlining loading and unloading work, improving loading rates, optimizing relay transport, and modal shifts, but none of these can be achieved without the cooperation of shippers. We will discuss in detail what is needed to improve the efficiency of logistics as a whole and transform logistics, which can be said to be the bloodstream of industry, into a sustainable one, and the roles that shippers, transport companies, and warehouse operators are expected to play.',
      keywords: [
        "SCM/Logistics",
        "consulting",
        "retail and distribution",
        "mobility",
      ],
      presenters: [
        {
          name: "Yojiro Goto",
          affliation:
            "Japan Freight Railway Company Railway Logistics Division",
          title: "General Logistics Department Manager",
          career:
            "Born in 1967. Joined Japan Freight Railway Company (JR Freight) in 1991. Seconded to the Japan Freight Transport Association (now a public interest incorporated association) in 1999, Group Leader of the Head Office Sales Department (Forwarding and Planning) in 2004, Deputy General Manager of the Tohoku Branch (Sales) in 2006, Group Leader of the International Logistics Development Department in 2010, Director and General Manager of the Sales Department of Nippon Freight Liner Co., Ltd. in 2015, General Manager of the Kansai Branch Sales Department in 2019, and General Manager of the General Logistics Department in 2021 (current position).",
        },
        {
          name: "Junko Matsuei",
          affliation: "NTT Data Corporate Consulting & Marketing Division",
          title:
            "Director, Sustainability Services & Strategy Promotion Office",
        },
      ],
    },
    "Nikkei Special Lecture R-14": {
      title:
        "Innovation to weave an ethical future: A digital ecosystem that will change the fashion industry supply chain",
      begin: "14:00",
      end: "14:40",
      abstract:
        "The environmental and social challenges facing the supply chain are becoming more complex day by day. In particular, as demands for reducing greenhouse gas emissions and water resources and ensuring worker safety grow, it is extremely important to achieve product traceability (a system that tracks a product's history from the procurement of raw materials to production, distribution, sales, and consumption) in order to improve quality, prevent the release of defective products, and gain consumer trust. This presentation will focus on the problems caused by inefficient communication in the fashion industry's supply chain, the remedial measures that can be implemented through an ecosystem concept, and future prospects.",
      keywords: ["EDI", "digital twin", "manufacturing"],
      presenters: [
        {
          name: "Koji Yoshimoto",
          affliation: "NTT Data Financial Innovation Headquarters",
          title: "Head of Global Customer Success",
        },
      ],
    },
    "Nikkei Special Lecture R-15": {
      title:
        'Medical big data and next-generation AI are the keys to change: The shift to a "patient-centric" approach and the future of the pharmaceutical business',
      begin: "15:00",
      end: "15:40",
      abstract:
        "As digital technology-driven business DX advances in all industries, the medical field is expected to transform patient-centric medical experiences (MX). The keys to this are medical big data and next-generation AI. With the revised Next-Generation Medical Infrastructure Act coming into force in May 2024, how can the pharmaceutical industry respond to the wave of structural changes and digitalization it faces, and move forward toward realizing patient-centric MX? Professor Yasushi Okuno of the Department of Big Data Medical Sciences at the Graduate School of Medicine, Kyoto University, will be speaking at the event to provide guidance on how to envision the future.",
      keywords: [
        "Data & Intelligence",
        "consulting",
        "Medical and Healthcare",
        "Pharmaceuticals and Life Sciences",
      ],
      presenters: [
        {
          name: "Yasushi Okuno",
          affliation: "Kyoto University Graduate School of Medicine",
          title: "Professor, Big Data Medical Science",
          career:
            "He graduated from the Faculty of Pharmaceutical Sciences at Kyoto University in 1993 and obtained a PhD in Pharmaceutical Sciences from the Graduate School of Pharmaceutical Sciences at the same university. After serving as a professor at the Graduate School of Medicine at the same university, he became a professor in the field of big data medical science at the Graduate School of Medicine at Kyoto University in 2016, where he remains to this day. He also serves as the representative director of the Life Intelligence Consortium, a general incorporated association, and as the head of the HPC/AI-driven pharmaceutical platform at the RIKEN Center for Computational Science. His specialties are computational science for drug discovery and big data medical science.",
        },
        {
          name: "Shimitsu Sekine",
          affliation: "NTT Data Second Industry Headquarters",
          title: "General Manager, Pharmaceuticals and Chemicals Division",
        },
      ],
    },
    "Nikkei Special Lecture R-17": {
      title:
        "Behind the Scenes of Transformation: Breaking Down Organizational Silos with the Power of Design",
      begin: "15:00",
      end: "15:40",
      abstract:
        "Based on what we learned through a business process restructuring (BPR) project with HAVI Supply Chain Solutions Japan (HAVI), an integrator that supports McDonald's supply chain, we will delve deeper into what value design can bring to the BPR field and how it can resolve the issue of silos within an organization. Furthermore, based on our experience of using design methods to find a path to true organizational transformation, we will talk about the future of SCM and the true value of design consulting.",
      keywords: [
        "SCM/Logistics",
        "consulting",
        "Food",
        "retail and distribution",
      ],
      presenters: [
        {
          name: "Ken Ebihara",
          affliation: "HAVI Supply Chain Solutions Japan",
          title:
            "Senior Manager, Restaurant Success and Success Enablement Department, Customer Success Division",
          career:
            "After joining Mitsui & Co. as a new graduate, he worked at an IT startup, as a freelance web producer, and as a producer for a company building new businesses using AI and VR. He joined the company in 2023. He is promoting a BPR project to review business processes and working styles in the supply chain. He currently serves as a senior manager in two departments and is challenging himself to create new working styles and improve performance through BPR. ",
        },
        {
          name: "Fumitaka Muragi",
          affliation:
            "NTT DATA Design & Technology Consulting Business Headquarters",
          title: "Service Design Group Tangity ADP",
        },
      ],
    },
    "Lecture R-02": {
      title:
        "Initiatives necessary for the future of distribution and retail: New store formats and business transformation through data-driven management",
      begin: "11:00",
      end: "11:40",
      abstract:
        'As the industry closest to consumers, the distribution and retail industries have responded sensitively to changes in the environment and have continued to change themselves, supporting the convenience and smiles of everyday life. In order to pursue "even greater convenience" and "everyday excitement" in a changing environment, NTT DATA believes that the following two initiatives will be important in the distribution and retail industry in the future: (1) "Further" response to products, services, and purchasing experiences that meet consumer needs (2) "Sustainable" business operations (labor reduction, automation, and high precision), which are also a social mission. In order to achieve these two seemingly contradictory initiatives, it is important to utilize the economic principles of digitalization, and we will explain the future vision of this.',
      keywords: [
        "Customer contact and payment",
        "SCM/Logistics",
        "Data & Intelligence",
        "retail and distribution",
      ],
      presenters: [
        {
          name: "Takayuki Tanaka",
          affliation: "NTT Data Second Industry Headquarters",
          title: "Distribution and Retail Business Department Manager",
        },
      ],
    },
    "Lunch Session R-04": {
      title: "Creating innovation with global startups",
      begin: "12:00",
      end: "12:40",
      abstract:
        'In recent years, investment in and development of startups has begun at the national level in Japan. Startups are also emerging one after another around the world, and for companies, co-creating and innovating with them is the key to creating new businesses. In this presentation, we will introduce an example of open innovation that was born out of collaboration between a Silicon Valley-based team at NTT DATA that promotes research and development of advanced technologies and collaboration with startups, and "From the Port of Toyosu," which promotes open innovation mainly in Japan. We will explore the key to successful open innovation on a global scale.',
      keywords: [
        "Customer contact and payment",
        "Data & Intelligence",
        "Robotics/RPA",
        "Disaster Prevention and Resilience",
        "retail and distribution",
      ],
      presenters: [
        {
          name: "Ken Matsui",
          affliation: "ugo",
          title: "Representative Director and CEO",
          career:
            'Graduated from the Faculty of Media Studies at Tokyo University of Technology. In 2006, he joined Monstar Lab Inc. as a founding member and developed smartphone apps and web systems for various new businesses. In 2011, he founded Mira, an IoT device development company, and gained experience in the development and mass production of various connected devices. In 2018, he founded ugo Inc. and became its CEO. In 2021, the business DX robot "ugo" began commercialization as a security robot. In addition to security, it is being introduced in the inspection field at data centers and power plants. In 2022, he won the Encouragement Award at the Tokyo Venture Technology Awards. In 2023, he was selected as one of Toyo Keizai Weekly\'s "100 Amazing Ventures."',
        },
        {
          name: "Izuru Watanabe",
          affliation: "NTT Data Corporate Planning Department",
          title: "Open Innovation Team Manager",
        },
        {
          name: "Kazuya Hirota",
          affliation: "NTT DATA Group Global Innovation Headquarters",
          title: "Alliance Promotion Office Senior Specialist",
        },
      ],
    },
    "Lunch Session R-05": {
      title:
        "What is SCM5.0? Human-centered supply chain management is needed now",
      begin: "12:00",
      end: "12:40",
      abstract:
        'Supply chains are currently experiencing major changes. The economic friction between the United States and China and the COVID-19 pandemic have caused unpredictable events such as parts shortages, transportation interruptions, and supply instability, exposing vulnerabilities like never before. Now that we need to respond to uncertainties in supply as well as demand, and also to ESG issues, building "resilience" that can adapt to dynamic changes will lead to the evolution and success of supply chain management (SCM). At the same time, the "people" perspective is important in advancing SCM reform. We will explain how to proceed with SCM reform from a "people" perspective.',
      keywords: [
        "SCM/Logistics",
        "consulting",
        "sustainability",
        "retail and distribution",
        "manufacturing",
      ],
      presenters: [
        {
          name: "Ryohei Sasagawa",
          affliation: "QUNIE CS Division",
          title: "Senior Partner",
          career:
            'After working for a domestic system integrator and a foreign consulting firm, he joined QUNIE. He has consistently worked on SCM/S&OP-related projects in the manufacturing industry, and has been engaged in SCM/S&OP business reform, ERP/SCP concept formulation and implementation consulting. He is currently in charge of the company\'s SCM practice. He has a strong track record of supporting steady improvement activities, from planning conception to establishment, in assembly and process manufacturing industries. His main publications include "Dynamic Supply Chain Management."',
        },
      ],
    },
    "Lunch Session R-07": {
      title: "Co-creation Social Design - NTT DATA's approach",
      begin: "12:00",
      end: "12:40",
      abstract:
        'Social issues are becoming more complex. NTT DATA believes it is important to predict social changes rather than follow them, and to paint a picture of the future to solve social issues. To achieve this, we need "co-creation social design," which co-creates solutions to problems that are valuable to consumers, governments, and businesses. At NTT DATA, we incorporate the perspective of a system for the sustainable exchange of value with overall consistency into our co-creation social design. In this presentation, we will introduce the concept of co-creation social design.',
      keywords: ["consulting", "Government agencies and local governments"],
      presenters: [
        {
          name: "Ryohei Matsumoto",
          affliation: "NTT Data Public Sector Headquarters",
          title: "Director of Social DX Promotion Office",
        },
      ],
    },
    "Lecture R-08": {
      title:
        "Will sustainability capabilities become a source of corporate competitiveness? - An approach to improving corporate and product value through digitalization -",
      begin: "13:00",
      end: "13:40",
      abstract:
        "Can sustainability be a source of corporate competitiveness? Recently, the need to address sustainability has increased in the business world, but some companies are struggling to link it to their business. In this presentation, NTT Data Institute of Management Consulting, which has a wide range of achievements, mainly in the fields of environment and energy, will introduce the impact of global trends surrounding sustainability on business, new business opportunities, the role of digital, etc. In addition, we will discuss what companies should do and what approach is necessary to improve their sustainability response capabilities, which are a source of competitiveness, by discussing NTT DATA's efforts as an IT company that has promoted sustainability for its customers and society as a whole.",
      keywords: [
        "Carbon Neutral",
        "consulting",
        "sustainability",
        "mobility",
        "manufacturing",
      ],
      presenters: [
        {
          name: "Toru Shimogaki",
          affliation: "NTT DATA Group Sustainability Management Department",
          title: "Director, Green Innovation Promotion Office",
        },
        {
          name: "Genji Muraoka",
          affliation: "NTT DATA Institute of Management Consulting",
          title:
            "Executive Officer/Partner, Head of Social and Environmental Strategy Consulting Unit",
          career:
            'After working for a major trading company and a think tank, he has been in his current position since June 2001. He has a wide range of achievements, mainly in the environmental energy field, including global warming countermeasures, business strategy formulation, smart community concept formulation, support for environmental infrastructure exports, and energy-based urban development. He has contributed many articles and given many lectures. His books include "PFI Business Entry Strategy" (B&T Books), "Illustrated Environmental Issues for Companies" (Toyo Keizai Shinposha), "Environmental Bankruptcy" (B&T Books), "Practical PFI Application Businesses" (Gyosei), "Succeed! How to Proceed with Regionally-Based Businesses" (Kankishuppan), "Detailed Explanation of Emissions Credit Trust System Design and Use Cases" (Chuokeizaisha), and "The Current State of Environmental Business" (NTT Publishing) (all co-authored), etc.',
        },
      ],
    },
    "Lecture R-09": {
      title:
        "What data utilization should be to create corporate value: The struggles and suggestions of a field leader who works alongside customers to continue providing value",
      begin: "13:00",
      end: "13:40",
      abstract:
        "Data utilization is becoming more common, but many people are facing various obstacles when promoting it. In fact, NTT DATA receives daily concerns and requests from a wide range of customers, including telecommunications, manufacturing, finance, and utilities, for whom it provides a data utilization platform. In this presentation, we will explore the key points for resolving these issues through a panel discussion with NTT DATA's field leaders who deal daily with the concerns, requests, and challenges that customers have regarding data utilization, and we will also propose what data utilization should be like.",
      keywords: [
        "cloud",
        "Data & Intelligence",
        "finance",
        "Electricity, Gas, and Water",
      ],
      presenters: [
        {
          name: "Hiroki Murayama",
          affliation:
            "NTT DATA Design & Technology Consulting Business Headquarters",
          title: "Snowflake Business Promotion Office Manager",
        },
        {
          name: "Shotaro Motomura",
          affliation: "NTT Data Telecom & Utility Business Headquarters",
          title: "Mobile Business Division Manager",
        },
        {
          name: "Hiroshi Azuchi",
          affliation: "NTT Data Third Financial Business Headquarters",
          title: "Insurance IT Business Division Manager",
        },
        {
          name: "Ryosuke Nihonmatsu",
          affliation: "NTT Data System Integration Business Headquarters",
          title: "System Integration Division Deputy Manager",
        },
      ],
    },
    "Lecture R-11": {
      title:
        "Future Outlook: Software Transforming Cars and Society - Resolving Social Issues with Connected Data -",
      begin: "14:00",
      end: "14:40",
      abstract:
        "NTT DATA defines three areas as the key to growth in the automotive industry: CX (customer contact-related services), MX (mobility services centered on autonomous driving), and EX (energy services centered on EVs). This presentation focuses on the MX area, which is undergoing a major transformation due to ICT technological innovation. We will look at the future of the industry, where transformations in vehicle development, autonomous driving, and data linkages will mutually influence and change. In addition, we will introduce the already-started solutions to social issues in the data linkages between connected data and other industries, including examples of initiatives by Toyota Motor Corporation and NTT DATA. We will think together to further accelerate transformation.",
      keywords: [
        "Carbon Neutral",
        "Data & Intelligence",
        "IoT",
        "mobility",
        "manufacturing",
      ],
      presenters: [
        {
          name: "Makoto Tamura",
          affliation:
            "Toyota Motor Corporation Digital Software Development Center",
          title:
            "e-TOYOTA Department DS Data Business Promotion Office Manager",
          career:
            "1988年トヨタ自動車の経営企画部門に入社。その後、IoT分野の新規事業企画推進に携わる。日本・中国におけるテレマティクスサービスの導入、日本・フランス・タイにおける小型電気自動車を活用したカーシェアリング事業を推進。現在はデータ事業推進室に所属し、車両データを活用した新規事業創出の推進に取り組んでいる。",
        },
        {
          name: "Yu Chiba",
          affliation: "NTT Data First Industry Headquarters",
          title: "Automotive Division Manager",
        },
      ],
    },
    "Lecture R-12": {
      title:
        "The future brought about by generative AI: How should companies prepare for the evolving age of AI?",
      begin: "14:00",
      end: "14:40",
      abstract:
        'With the emergence of generative AI such as "ChatGPT" and "DALL·E", the world is about to change dramatically. Many people are aware that disruptive changes are occurring in our lives, work styles, and business. On the other hand, issues with generative AI such as security, hallucination, and inappropriate answers are becoming clear. In this presentation, we will summarize the technical background and issues of generative AI, and introduce how people\'s lives, society, and business will change with the advancement of AI, and how companies should prepare and create value in the coming world, while also introducing specific services.',
      keywords: [
        "CRM (Salesforce)",
        "Data & Intelligence",
        "consulting",
        "finance",
        "Electricity, Gas, and Water",
      ],
      presenters: [
        {
          name: "Ryoji Okuda",
          affliation:
            "NTT DATA Design & Technology Consulting Business Headquarters",
          title: "Digital Success Consulting Unit Head",
        },
        {
          name: "Tetsuro Nomura",
          affliation:
            "NTT DATA Design & Technology Consulting Business Headquarters",
          title: "Digital Success Consulting Unit Manager",
        },
      ],
    },
    "Lecture R-13": {
      title:
        "Organizational and human resource management required in the digital age: A thorough explanation of seven strategic actions",
      begin: "14:00",
      end: "14:40",
      abstract:
        'As the speed of change in the social and business environment accelerates, the key to ensuring that mid- to long-term visions, management strategies, and DX strategies are implemented and connected to business results is "organizational and human resource strategies" and "organizational agility to quickly respond to change." However, in reality, only a limited number of companies have been able to overcome issues such as organizational rigidity, difficulty in acquiring necessary human resources, and skill mismatch. In this presentation, we will delve into seven important transformation themes that managers in charge of each business and function should essentially consider responding to, without being misled by buzzwords. We will also introduce the overview and background of the necessity, common pitfalls, and how to overcome them, including corporate examples.',
      keywords: [
        "Data & Intelligence",
        "consulting",
        "mobility",
        "manufacturing",
      ],
      presenters: [
        {
          name: "Chang An Wise",
          affliation: "NTT DATA Institute of Management Consulting",
          title:
            "Partner Organizational and Human Resources Transformation Consulting Department Head of Organizational and Human Resources Transformation Consulting Department",
          career:
            "After more than 20 years of consulting experience in the areas of organization and human resources at a major foreign consulting firm, he joined NTT Data Institute of Management Consulting. In a wide range of industries, including IT, communications, high tech, finance, manufacturing, retail, services, chemicals, and energy, he has a track record of leading the formulation of optimal HR and talent strategies in line with strategies and future business models, strengthening digital organizations, strengthening group governance, company-wide organizational reform/optimization, strengthening key workforces including digital, building reskilling/resource shift models that utilize employee autonomy, defining human capital information/human resources dashboards, and strengthening next-generation leadership. From strategy conception to execution level, he supports the creation of competitive models that utilize people and continue to change in an agile manner.",
        },
      ],
    },
    "Lecture R-16": {
      title:
        "JR Central's digital transformation to generate new demand - Three measures to address the post-COVID-19 environmental changes and future digital strategies -",
      begin: "15:00",
      end: "15:40",
      abstract:
        "In an industry that has seen major changes in its business environment due to the COVID-19 pandemic, JR Central will talk about how it came up with new initiatives, how NTT DATA has supported them, and what kind of growth strategy they are drawing up together for the future, including the trial and error process.",
      keywords: [
        "Customer contact and payment",
        "Data & Intelligence",
        "Application Development and Management",
        "retail and distribution",
      ],
      presenters: [
        {
          name: "Takemichi Kobayashi",
          affliation:
            "Central Japan Railway Company Business Promotion Headquarters",
          title: "Manager of DX Promotion and Marketing Division",
          career:
            "He joined the company in 2000. After working on business development such as station building development and new business development, he worked on systems development for the online reservation service (EX Service) for the Tokaido-Sanyo Shinkansen. In his current position as project leader of the DX Promotion and Marketing Team, he is involved in a variety of digital-based projects, including the development of a group-wide sales system, the creation of a group-wide points system, and the construction of a marketing platform.",
        },
        {
          name: "Katsuhiko Yuchi",
          affliation: "NTT Data First Industry Headquarters",
          title:
            "Transportation, Tourism and Entertainment Business Department Manager",
        },
      ],
    },
    "Lecture R-18": {
      title:
        "Cutting-edge business innovation through advanced technology - Introducing the latest global examples of quantum computing, blockchain utilization, etc.",
      begin: "16:00",
      end: "16:40",
      abstract:
        "The cutting edge of business innovation driven by cutting-edge technology that is currently in the spotlight. We will deliver selected examples of co-creation with global customers from the hottest themes that our Innovation Center, which has bases in six countries around the world, is working on. - Blockchain, digital twin, and quantum computing are in the business expansion phase. - Technologies that are expected to grow in the future include satellite data utilization and AR (Augmented Reality) cloud.",
      keywords: [
        "blockchain",
        "Quantum Computer Ising Machine",
        "digital twin",
        "finance",
        "manufacturing",
      ],
      presenters: [
        {
          name: "Kenji Kubo",
          affliation: "Flavor fermentation",
          title:
            "Representative Director and Chief Business Development Officer",
          career:
            'On May 15, 2017, based on the results of the Institute of Scientific and Industrial Research, Osaka University, titled "Quantitative expression method for all odors based on the reactivity of olfactory receptors," he founded Kaori Hakko Co., Ltd., a company that specializes in odor quantification using a whole-human olfactory receptor cell array sensor.',
        },
        {
          name: "Hiroshi Furukawa",
          affliation: "NTT DATA Group Technology and Innovation Headquarters",
          title: "Innovation Center Director",
        },
        {
          name: "Shinji Yotoriyama",
          affliation: "NTT Data Third Financial Business Headquarters",
          title: "Next Generation Payment Technology Promotion Office Director",
        },
      ],
    },
    "Lecture R-19": {
      title:
        "Future regional development as seen through the examples of France and Denmark: Regional revitalization as a place for creativity and self-actualization",
      begin: "16:00",
      end: "16:40",
      abstract:
        "The combination of advances in digital technology and changes in industrial structure is giving rise to an increasing number of highly creative industries in regional areas. How should policymakers in regional cities and managers of regional industries face these new opportunities? In this lecture, experts from France and Denmark will join us to explore how foresight-driven regional development can be achieved.",
      keywords: [
        "consulting",
        "sustainability",
        "Government agencies and local governments",
      ],
      presenters: [
        {
          name: "Mika Yasuoka",
          affliation: "Roskilde University, Denmark",
          title: "Associate Professor Nordic Institute Representative",
          career:
            'Associate Professor at Roskilde University / Outside Director at Members / Executive Advisor at Smart City Institute / JETRO Consultant. Interested in the theory and practice of participatory design and living labs as IT system construction methods in Scandinavia, and the socio-cultural impact of these methods. In recent years, he has been working on smart city and avatar research with companies and universities. His most recent publication is "Smart Cities in Scandinavia" (Gakugei Publishing).',
        },
        {
          name: "Noriyoshi Enei",
          affliation: "NTT DATA Institute of Management Consulting",
          title: "Partner Head of Regional Future Design Unit",
          career:
            "With a focus on solving regional and social issues, he is responsible for policy formulation, social implementation, and project business creation in the areas of regional revitalization, food and sustainability, and resilience. He has served as a special lecturer at the University of Tokyo Graduate School of Urban Planning, director of the Japan Association of Urban Planners, member of the Smart City Special Committee of the City Planning Institute of Japan (public interest incorporated foundation), expert member of the Regional BCM Study Group of the Japan Chamber of Commerce and Industry, member of the Economy, Trade and Industry Society 5.0 International Standardization Preparation Committee, and member of the Verification Committee of the Central Support Center for Rural Innovation of the Ministry of Agriculture, Forestry and Fisheries.",
        },
      ],
    },
    "Lecture R-20": {
      title:
        "Revolutionizing traceability through industrial data distribution - Changes in the ecosystem facing the manufacturing industry and the potential for new business through data distribution -",
      begin: "16:00",
      end: "16:40",
      abstract:
        "As the way product value is provided is changing, we are entering an era in which product operation data, manufacturing history data, and other data will be distributed across borders through IoT. In order to continue providing value in the ecosystem/supply chain to which your company belongs and survive, traceability of business and product information is necessary. We will explain how to respond to and utilize the data space expected in the future, and the new business forms that will be born from that data. In addition, the key to realizing new business is to use platforms and applications that allow data distribution, and to improve the accuracy of your company's data that is distributed on top of that. From these perspectives, we will talk about the reforms that you must undertake from now on.",
      keywords: [
        "Carbon Neutral",
        "SCM/Logistics",
        "System infrastructure design",
        "retail and distribution",
        "manufacturing",
      ],
      presenters: [
        {
          name: "Junichi Sudo",
          affliation: "QUNIE CS Business Headquarters",
          title: "Senior Partner",
          career:
            "After working in product design and mass production start-up at a manufacturer, he joined NTT Data Business Consulting (now QUNIE) after working for a foreign PLM vendor and a consulting company for the manufacturing industry. He is well versed in the manufacturing industries of automobiles, automobile parts, heavy industry, machine tools, industrial machinery, etc., and leads a wide range of projects such as business reform/system introduction in the design/development field, production management, and new business planning (industry-specific B2B business, etc.).",
        },
      ],
    },
    "Exhibit 1": {
      title: "Digital Humans Using Generative AI and 3D Avatars",
      begin: "10:00",
      end: "17:30",
      abstract:
        "Digital humans are a technology that combines generative AI, which has been rapidly evolving in recent years, with 3D avatar technology to create a human form that can converse with us and enrich our society. In Japan in particular, the decline in the working population is an urgent social issue. It is expected that the social need for digital humans will increase in the future, as they can handle tasks that are unprofitable to do manually and long working hours. Please try a realistic conversation with a digital human.",
      presenters: [
        {
          name: "Shinji Momota",
          affliation: "NTT DATA Group Technology and Innovation Headquarters",
          title: "Innovation Center Manager",
        },
        {
          name: "Naoki Ohsugi",
          affliation: "NTT DATA Group Technology and Innovation Headquarters",
          title: "Innovation Center Senior Expert",
        },
        {
          name: "Toyoaki Kagaya",
          affliation: "NTT DATA Group Technology and Innovation Headquarters",
          title: "Innovation Center Senior Expert",
        },
      ],
    },
    "Exhibit 2": {
      title:
        "Digital Transformation in the Odor and Fragrance Industry: Odor Synthesis and Transfer Platform Using Advanced Optimization Technology",
      begin: "10:00",
      end: "17:30",
      abstract:
        "We will exhibit advanced fragrance synthesis methods using digital technology and actual synthesized fragrances. Kaori Hakko, a venture company spun out of Osaka University, has developed the world's first technology that can quantify all odors that exist in the world. In addition, NTT DATA is working on developing large-scale, highly challenging numerical calculation methods using advanced computational technologies such as quantum computers. This technology will enable the handling of highly accurate and transferable odor information, and is expected to bring innovation to industries such as food, healthcare, medicine, and the metaverse.",
      presenters: [],
    },
    "Exhibit 3": {
      title:
        "Cross-modal AI for personality diagnosis and visualization of well-being",
      begin: "10:00",
      end: "17:30",
      abstract:
        "The two solutions each analyze and report on a person's personality and state of well-being from 30 seconds of camera footage. (1) Nickname Generation AI: Using cross-modal AI that comprehensively analyzes facial expressions, voice, and speech content, it visualizes features (personalities) that distinguish you from others. It also generates nicknames that highlight your individuality. It encourages you to recognize your individuality as a strength and live life as yourself. (2) Face.ing: Measures heart rate, respiratory rate, etc. from facial footage to visualize the level of well-being (how lively your mind and body are). It can be easily measured by simply facing a smartphone or other camera without having to attach sensors, etc.",
      presenters: [],
    },
  };
}

class GetEventInfoFunctionEnglish extends EventTimetableFunctionEnglish {
  constructor() {
    super({
      name: "getEventInfo",
      description:
        "Get the event info of NTT DATA Foresight Day 2024, including the name, theme, venue, organizer, date, begin time, end time, fee, and currency.",
    });
  }

  async call({ parameters }) {
    return EventTimetableFunctionEnglish.eventInfo;
  }

  async onAvatarTalk({ result, document }) {}
}
export const getEventInfoFunctionEnglish = new GetEventInfoFunctionEnglish();

class GetSessionInfoByPresenterFunctionEnglish extends EventTimetableFunctionEnglish {
  constructor() {
    super({
      name: "getSessionInfoByPresenter",
      description:
        "Get the title, begin time, end time, abstract, and all presenters of the session(s) by the given presenter name.",
      parameters: [
        new Parameter({
          name: "name",
          type: "string",
          description:
            "The name of the presenter for which the session is to be retrieved.",
          required: true,
        }),
      ],
    });
  }

  async call({ parameters }) {
    var retValue = {};
    for (var key in EventTimetableFunctionEnglish.timeTable) {
      var session = EventTimetableFunctionEnglish.timeTable[key];
      if (
        session.presenters &&
        session.presenters.some((presenter) =>
          presenter.name.includes(parameters.name)
        )
      ) {
        retValue[key] = {
          title: session.title,
          begin: session.begin,
          end: session.end,
          abstract: session.abstract,
          presenters: session.presenters,
        };
      }
    }
    return retValue;
  }
}
export const getSessionInfoByPresenterFunctionEnglish =
  new GetSessionInfoByPresenterFunctionEnglish();

class GetSessionInfoByKeywordFunctionEnglish extends EventTimetableFunctionEnglish {
  constructor() {
    super({
      name: "getSessionInfoByTopicFunction",
      description:
        "Get the title, begin time, end time, abstract, and all presenters of the session(s) by the given keyword.",
      parameters: [
        new Parameter({
          name: "keyword",
          type: "string",
          description: "The keyword for which the session is to be retrieved.",
          required: true,
        }),
      ],
    });
  }

  async call({ parameters }) {
    var retValue = {};
    for (var key in EventTimetableFunctionEnglish.timeTable) {
      var session = EventTimetableFunctionEnglish.timeTable[key];
      if (
        session.title.includes(parameters.keyword) ||
        session.abstract.includes(parameters.keyword) ||
        ("keywords" in session && session.keywords.includes(parameters.keyword))
      ) {
        retValue[key] = {
          title: session.title,
          begin: session.begin,
          end: session.end,
          abstract: session.abstract,
          presenters: session.presenters,
        };
      }
    }
    return retValue;
  }
}
export const getSessionInfoByKeywordFunctionEnglish =
  new GetSessionInfoByKeywordFunctionEnglish();

class GetRecommendedSessionsFunctionEnglish extends ChatGPTFunction {
  constructor() {
    super({
      name: "getRecommendedSessionsFunction",
      description:
        "Get the title, begin time, end time, abstract, and all presenters of the recommended session(s).",
      parameters: [
        new ArrayParameter({
          name: "keywords",
          type: "string",
          description:
            "The keywords for which the sessions are to be retrieved.",
        }),
      ],
      prompt: new Prompt({
        messages: [
          {
            role: "system",
            content: `You are the recommendation system for the event sessions. Please suggest some recommended sessions and/or exhibits that I can join at the current time from the below timetable.`,
          },
        ],
        maxTokens: 1024,
      }),
      apiKey: apiKeys.openai,
      failedMessage: "Error: ChatGPT Request Failed",
    });
  }

  static outputFormat = {
    "Name of the recommended session 1": {
      title: "Title of the session 1",
      begin: "Begin time of the session 1",
      end: "End time of the session 1",
      presenters: [
        {
          name: "Name of the presenter 1",
          affiliation: "Affiliation of the presenter 1",
          title: "Affiliation of the presenter 1",
        },
        {
          name: "Name of the presenter 2, after this any number of presenters can be added",
          affiliation: "Affiliation of the presenter 2",
          title: "Affiliation of the presenter 2",
        },
      ],
    },
    "Session 2 name": {
      title:
        "Title of the session 2, after this any number of sessions can be added",
      begin: "Begin time of the session 2",
      end: "End time of the session 2",
      presenters: [
        {
          name: "Name of the presenter 1",
          affiliation: "Affiliation of the presenter 1",
          title: "Affiliation of the presenter 1",
        },
        {
          name: "Name of the presenter 2, after this any number of presenters can be added",
          affiliation: "Affiliation of the presenter 2",
          title: "Affiliation of the presenter 2",
        },
      ],
    },
  };

  async call({ parameters }) {
    // Deep copy the timetable.
    var summarizedTimeTable = {};
    for (var key in EventTimetableFunctionEnglish.timeTable) {
      var session = EventTimetableFunctionEnglish.timeTable[key];
      summarizedTimeTable[key] = {
        title: session.title,
        begin: session.begin,
        end: session.end,
        presenters: session.presenters,
      };
    }

    // Remove carrior from the presentors data in the summarizedTimeTable.
    for (var key in summarizedTimeTable) {
      if (summarizedTimeTable[key].presenters) {
        summarizedTimeTable[key].presenters.forEach((presenter) => {
          delete presenter.career;
        });
      }
    }

    // Add summarizedTimeTable to the system part of the prompt.
    this.prompt.messages[0].content += "\n\n";
    this.prompt.messages[0].content += JSON.stringify(
      summarizedTimeTable,
      null,
      2
    );

    this.prompt.messages[0].content += "\n\n";
    this.prompt.messages[0].content += `The output format is the following JSON format: ${JSON.stringify(
      GetRecommendedSessionsFunctionEnglish.outputFormat,
      null,
      2
    )}`;

    var requestMessage = "";
    if (parameters.keywords && parameters.keywords.length > 0) {
      requestMessage += `I am interested in sessions related to ${parameters.keywords.join(
        ", "
      )}. `;
    } else {
      requestMessage += "I am interested in all sessions. ";
    }

    let date = new Date();
    let localDate = date.toLocaleString("en-US", { timeZone: "Asia/Tokyo" });
    requestMessage += `Please recommend some sessions that I can join at ${localDate}.`;
    this.prompt.messages.push({
      role: "user",
      content: requestMessage,
    });
    var jsonData = await this.fetch();
    // Find the first '{' and the last '}' to extract the JSON data.
    var firstBracket = jsonData.indexOf("{");
    var lastBracket = jsonData.lastIndexOf("}");
    if (firstBracket == -1 || lastBracket == -1) {
      jsonData = "{}";
    } else {
      jsonData = jsonData.substring(firstBracket, lastBracket + 1);
    }
    var retValue = JSON.parse(jsonData);

    // Add abstract to the output from the timetable.
    for (var key in retValue) {
      if (key in EventTimetableFunctionEnglish.timeTable) {
        retValue[key].abstract =
          EventTimetableFunctionEnglish.timeTable[key].abstract;
      }
    }

    return retValue;
  }
}
export const getRecommendedSessionsFunctionEnglish =
  new GetRecommendedSessionsFunctionEnglish();

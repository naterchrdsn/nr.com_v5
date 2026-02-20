export interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  image?: string;
}

export interface CaseStudy {
  title: string;
  subtitle: string;
  image?: string;
  challenge: string;
  solution: string;
  impact: string;
  technologies: string[];
}

export const projects: Project[] = [
  {
    title: 'Spudnik',
    description:
      'Spudnik is a discord bot focused on guild management and adding interesting and useful functionality to your server. It was built on top of some of the most popular and widely used frameworks for extendibility and written with organization and customization in mind. At the bot\'s peak, it was in almost 200 servers and was successfully scaled to handle thousands of concurrent user interactions on Heroku. With the bot being depended on by so many users, I took the time to implement excellent CI/CD practices and downtime was minimal.',
    technologies: [
      'Typescript',
      'mongoDB',
      'discord.js + klasa framework',
      'Github Pages',
      'nodemon',
      'TravisCI',
      'Heroku',
    ],
    link: 'https://github.com/Spudnik-Group/Spudnik',
    image: '/images/portfolio/spudnik.png',
  },
  {
    title: 'Kirbi',
    description:
      'Kirbi is a self-hosted, modular chat bot for Slack and Discord. While there was an official Kirbi bot serving a few servers, the goal was for anyone to host their own instance of Kirbi and only add the functionality they are interested in. I also created multiple modules for integration with Kirbi instances ranging from platform integration (Discord/Slack), to fun (random cat facts, xkcd comics, etc), and also some more involved lookup commands (wikipedia, dictionary, and other 3rd party apis). The focus of the project started to be on adding modules specific to Discord, adding features that were not available on the platform at the time.',
    technologies: [
      'Javascript',
      '@slack/client + discord.js',
      'TravisCI',
      'GCP',
    ],
    link: 'https://github.com/Kirbi-bot/Kirbi',
    image: '/images/portfolio/kirbi.png',
  },
];

export const websitePortfolio = [
  { title: 'Deanne Burch Photography', image: '/images/portfolio/Deanne-Burch-Photography_Version-2.png' },
  { title: 'GReY', image: '/images/portfolio/GReY_all.png' },
  { title: 'HACC Foundation', image: '/images/portfolio/HACC-Foundation.png' },
  { title: 'Revolving Bear', image: '/images/portfolio/Revolving-Bear.png' },
];

export const caseStudies: CaseStudy[] = [
  {
    title: 'Home Depot Design Center',
    subtitle: 'Interactive Booking Platform',
    image: '/images/portfolio/hddc.png',
    challenge:
      'What started as a proof of concept quickly needed to scale into a robust system supporting not just the flagship location, but eventually stores across the country. The original app was buckling under real-world usage, with page load times stretching over 15 seconds—completely unacceptable for a customer-facing booking system. We were essentially building two interconnected systems: a customer-facing booking platform and an internal management tool.',
    solution:
      'I led the frontend development and took on the challenge of refactoring the entire codebase to leverage the latest Angular features. This wasn\'t just about updating dependencies—it was about transforming a fragile POC into a scalable, maintainable system. I worked closely with the backend team to ensure our frontend could handle the asynchronous nature of the booking process gracefully. Beyond just building features, I standardized frontend practices across the entire organization through tech talks and developer meetings.',
    impact:
      'Page load times dropped from over 15 seconds to milliseconds—a 140% improvement that fundamentally changed the user experience. The platform successfully launched and scaled to handle hundreds of thousands of bookings, supporting Home Depot\'s expansion of the Design Center concept to multiple locations.',
    technologies: [
      'Angular',
      'TypeScript',
      'JavaScript',
      'Docker',
      'AWS',
      'GCP',
      'Concourse CI',
      'Java',
    ],
  },
  {
    title: 'CharterUp',
    subtitle: 'Conversational Bus Booking Platform',
    image: '/images/portfolio/charterup.png',
    challenge:
      'CharterUp wanted to revolutionize the charter bus booking experience by making it feel more human and approachable. Inspired by the success of companies like Lemonade Insurance, we set out to prove that conversational interfaces could transform traditionally painful transactional processes.',
    solution:
      'I created a friendly customer service persona that guided users through booking their charter bus. The conversational interface made the entire process feel easy and personal. I handled the frontend implementation in Vue.js, coded Python endpoints to process and save booking details, implemented Google Maps integration for address verification, and set up the CI/CD pipeline for the new application.',
    impact:
      'The conversational approach transformed a complex booking process into an approachable experience. I helped shape the product\'s direction by working directly with stakeholders to refine the conversational flow and identify which parts of the booking process benefited most from the guided approach.',
    technologies: [
      'Vue.js',
      'JavaScript',
      'TypeScript',
      'AWS',
      'Jenkins CI',
      'Python',
    ],
  },
  {
    title: 'Test Runner UI',
    subtitle: 'Internal Testing Platform',
    image: '/images/portfolio/test-runner-ui.png',
    challenge:
      'Our company\'s end-to-end testing process was a nightmare. To set up and view test scenarios for the entire backbone of our systems, developers had to make manual Postman requests, dig through specific bits of metadata, and trace through Splunk logs. It was time-consuming, error-prone, and a terrible developer experience.',
    solution:
      'I architected and developed a comprehensive UI that streamlined the entire debugging process. The tool featured advanced metadata-based search capabilities and interactive AG Grid visualizations that made it easy to find exactly what you were looking for. I took this project on independently—from initial architecture through deployment.',
    impact:
      'The tool fundamentally changed how our teams approached testing and debugging, turning a frustrating manual process into a streamlined, visual experience. This work also led to improvements in our company-wide component library, contributing back to tools that benefited the entire engineering organization.',
    technologies: [
      'Angular',
      'TypeScript',
      'JavaScript',
      'AG Grid',
      'NX',
      'Docker',
      'Nginx',
      'Concourse CI',
    ],
  },
];

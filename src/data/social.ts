export interface SocialLink {
  label: string;
  url: string;
  icon: string;
}

export const socialLinks: SocialLink[] = [
  {
    label: 'GitHub',
    url: 'https://github.com/naterchrdsn',
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/naterchrdsn/',
    icon: 'linkedin',
  },
  {
    label: 'Bluesky',
    url: 'https://bsky.app/profile/naterichardson.com',
    icon: 'bluesky',
  },
];

export const contactInfo = {
  nachoLabs: 'https://nacholabs.net/contact',
  message:
    'Want To Collaborate? Contact me at Nacho Labs!',
};

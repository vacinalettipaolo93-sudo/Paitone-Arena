
export interface Court {
  id: string;
  name: string;
  type: 'Tennis' | 'Padel';
  slots: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface SiteEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  imageUrl: string;
  category: string;
}

export interface SiteConfig {
  hero: {
    title: string;
    highlight: string;
    subtitle: string;
    imageUrl: string;
  };
  stats: {
    tennis: string;
    padel: string;
    members: string;
    coaches: string;
  };
  events: SiteEvent[];
  courts: {
    tennis: {
      title: string;
      description: string;
      imageUrls: string[];
      tags: string[];
      individualCourts: { id: string, name: string, slots: string[] }[];
    };
    padel: {
      title: string;
      description: string;
      imageUrls: string[];
      tags: string[];
      individualCourts: { id: string, name: string, slots: string[] }[];
    };
  };
  footer: {
    address: string;
    phone: string;
    email: string;
  };
}

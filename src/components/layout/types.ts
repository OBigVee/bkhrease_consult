export interface NavigationItem {
  name: string;
  href: string;
  current?: boolean;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
  ariaLabel: string;
}

export interface QuickLink {
  name: string;
  href: string;
}

export interface CompanyInfo {
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  description: string;
}

export interface SEOData {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  structuredData?: any;
  noIndex?: boolean;
  author?: string;
}

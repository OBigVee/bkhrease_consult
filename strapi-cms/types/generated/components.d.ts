import type { Schema, Attribute } from '@strapi/strapi';

export interface SharedSocialLinks extends Schema.Component {
  collectionName: 'components_shared_social_links';
  info: {
    displayName: 'socialLinks';
  };
  attributes: {
    linkedin: Attribute.String;
    email: Attribute.Email;
  };
}

export interface SharedSeo extends Schema.Component {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'SEO';
    icon: 'search';
    description: '';
  };
  attributes: {
    metaTitle: Attribute.String;
    metaDescription: Attribute.Text;
    keywords: Attribute.JSON;
  };
}

export interface ContentStatistics extends Schema.Component {
  collectionName: 'components_content_statistics';
  info: {
    displayName: 'Statistics';
    icon: 'chart-pie';
    description: '';
  };
  attributes: {
    studentsTrained: Attribute.Integer;
    foundingYear: Attribute.Integer;
    partnersCount: Attribute.Integer;
  };
}

export interface ContentContactInfo extends Schema.Component {
  collectionName: 'components_content_contact_infos';
  info: {
    displayName: 'ContactInfo';
    icon: 'phone';
    description: '';
  };
  attributes: {
    email: Attribute.Email;
    phone: Attribute.String;
  };
}

export interface ContentBoldValues extends Schema.Component {
  collectionName: 'components_content_bold_values';
  info: {
    displayName: 'BoldValues';
    icon: 'star';
    description: '';
  };
  attributes: {
    believe: Attribute.Text;
    overcome: Attribute.Text;
    lead: Attribute.Text;
    deliver: Attribute.Text;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'shared.social-links': SharedSocialLinks;
      'shared.seo': SharedSeo;
      'content.statistics': ContentStatistics;
      'content.contact-info': ContentContactInfo;
      'content.bold-values': ContentBoldValues;
    }
  }
}

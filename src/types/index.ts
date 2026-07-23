// types/index.ts

export interface Category {
  id: string;
  slug: string;
  name: string;
  nameHi: string;
  description: string;
  descriptionHi: string;
  icon: string;
  color: string;
  bgColor: string;
  documentCount: number;
  featured: boolean;
  order: number;
}

export interface DocumentTemplate {
  id: string;
  slug: string;
  categoryId: string;
  name: string;
  nameHi: string;
  description: string;
  descriptionHi: string;
  purpose: string;
  purposeHi: string;
  isPremium: boolean;
  isPopular: boolean;
  isNew: boolean;
  stampRequired: boolean;
  witnessRequired: boolean;
  notaryRecommended: boolean;
  estimatedTime: string;
  tags: string[];
  steps: FormStep[];
  submissionGuidance: SubmissionGuidance;
  requirements: string[];
  createdAt: string;
  updatedAt: string;
}

export interface FormStep {
  id: string;
  title: string;
  titleHi?: string;
  description: string;
  fields: FormField[];
}

export interface FormField {
  id: string;
  label: string;
  labelHi: string;
  type: FieldType;
  placeholder?: string;
  placeholderHi?: string;
  required: boolean;
  helpText?: string;
  helpTextHi?: string;
  options?: SelectOption[];
  validation?: FieldValidation;
  defaultValue?: string;
  prefix?: string;
  suffix?: string;
  rows?: number;
}

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "date"
  | "select"
  | "radio"
  | "checkbox"
  | "email"
  | "phone"
  | "address"
  | "currency"
  | "percentage";

export interface SelectOption {
  value: string;
  label: string;
  labelHi?: string;
}

export interface FieldValidation {
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: string;
  patternMessage?: string;
}

export interface SubmissionGuidance {
  stampPaper?: string;
  witnesses?: string;
  notary?: string;
  documentsRequired: string[];
  generalSteps: string[];
  importantNotes: string[];
}

export interface GeneratedDocument {
  id: string;
  templateId: string;
  templateName: string;
  categoryName: string;
  userId: string;
  formData: Record<string, string>;
  status: "draft" | "complete" | "downloaded";
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  plan: "free" | "premium";
  createdAt: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavItem[];
}

export type Language = "en" | "hi";

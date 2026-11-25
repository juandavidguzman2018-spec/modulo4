export const CATEGORIES = ['Lectura', 'Práctica', 'Repaso'] as const;
export type Category = typeof CATEGORIES[number];

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: Category;
}

export function isResource(value: unknown): value is Resource {
  if (!value || typeof value !== 'object') {
    return false;
  }
  const resource = value as Partial<Resource>;
  return typeof resource.id === 'string' && typeof resource.title === 'string'
    && typeof resource.description === 'string' && CATEGORIES.includes(resource.category);
}

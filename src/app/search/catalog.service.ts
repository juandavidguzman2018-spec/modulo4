import { Injectable } from '@angular/core';
import { ApplicationSettings, Http } from '@nativescript/core';
import { API_BASE_URL } from '../core/api.config';
import { CATEGORIES, Category, Resource, isResource } from '../core/resource';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  private readonly resources = new Map<string, Resource>();

  async search(query: string): Promise<Resource[]> {
    if (!API_BASE_URL) {
      throw new Error('Configura NGROK_BASE_URL para conectar con el catálogo.');
    }
    const encoded = encodeURIComponent(query.trim());
    const response = await Http.request({
      method: 'GET',
      url: API_BASE_URL + '/api/resources?q=' + encoded,
      headers: { Accept: 'application/json', 'ngrok-skip-browser-warning': 'true' },
      timeout: 8000,
    });
    if (response.statusCode !== 200) {
      throw new Error('El catálogo respondió con HTTP ' + response.statusCode + '.');
    }

    const payload: unknown = response.content.toJSON();
    if (!Array.isArray(payload) || !payload.every(isResource)) {
      throw new Error('La respuesta del catálogo no tiene el formato esperado.');
    }
    return payload.map((resource) => {
      const category = ApplicationSettings.getString(this.categoryKey(resource.id), '');
      const local = CATEGORIES.find((option) => option === category);
      const result = { ...resource, category: local ?? resource.category };
      this.resources.set(result.id, result);
      return result;
    });
  }

  find(id: string | null): Resource | undefined {
    return id ? this.resources.get(id) : undefined;
  }

  changeCategory(resource: Resource, category: Category): void {
    ApplicationSettings.setString(this.categoryKey(resource.id), category);
    resource.category = category;
  }

  private categoryKey(id: string): string {
    return 'catalog.category.' + id;
  }
}

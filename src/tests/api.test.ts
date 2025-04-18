import { describe, it, expect, beforeAll } from 'vitest';
import { api } from '@/services/api';
import { server } from '@/mocks/node';
import { http, HttpResponse } from 'msw';

beforeAll(() => {
  // Ensure window.location.origin is defined for API base URL
  Object.defineProperty(window, 'location', {
    value: { origin: 'http://localhost' },
    writable: true,
  });
});

describe('API Service', () => {
  const mockSpices = [
    { id: 1, name: 'Cinnamon', price: '$2.99', color: 'brown', heat: 0 },
    { id: 2, name: 'Paprika', price: '$3.99', color: 'red', heat: 2 },
  ];

  const mockBlends = [
    { id: 1, name: 'Basic Blend', spices: [1, 2], blends: [], description: 'Test' },
  ];

  describe('Spice API', () => {
    it('getAllSpices fetches and returns spices', async () => {
      server.use(
        http.get('/api/spices', () => {
          return HttpResponse.json(mockSpices);
        })
      );

      const result = await api.getAllSpices();
      expect(result).toEqual(mockSpices);
    });

    it('getSpiceById returns a specific spice', async () => {
      server.use(
        http.get('/api/spices/:id', ({ params }) => {
          if (params.id === '1') {
            return HttpResponse.json(mockSpices[0]);
          }
          return new HttpResponse(null, { status: 404 });
        })
      );

      const result = await api.getSpiceById(1);
      expect(result).toEqual(mockSpices[0]);
    });

    it('getSpiceById returns undefined for non-existing spice', async () => {
      server.use(
        http.get('/api/spices/:id', () => {
          return new HttpResponse(null, { status: 404 });
        })
      );

      const result = await api.getSpiceById(999);
      expect(result).toBeUndefined();
    });
  });

  describe('Blend API', () => {
    it('getAllBlends fetches and returns blends', async () => {
      server.use(
        http.get('/api/blends', () => {
          return HttpResponse.json(mockBlends);
        })
      );

      const result = await api.getAllBlends();
      expect(result).toEqual(mockBlends);
    });

    it('createBlend sends correct data and returns created blend', async () => {
      const newBlend = { name: 'New Blend', spices: [1], blends: [], description: 'Test' };
      const createdBlend = { id: 2, ...newBlend };

      server.use(
        http.post('/api/blends', async ({ request }) => {
          const body = await request.json();
          expect(body).toEqual(newBlend);
          return HttpResponse.json(createdBlend);
        })
      );

      const result = await api.createBlend(newBlend);
      expect(result).toEqual(createdBlend);
    });
  });

  describe('Error Handling', () => {
    it('handles server errors gracefully', async () => {
      server.use(
        http.get('/api/spices', () => {
          return new HttpResponse(null, { status: 500 });
        })
      );

      await expect(api.getAllSpices()).rejects.toThrow(/API request failed/);
    });

    it('handles timeouts', async () => {
      server.use(
        http.get('/api/spices', async () => {
          await new Promise(res => setTimeout(res, 50));
          return new HttpResponse(null, { status: 408 });
        })
      );

      await expect(api.getAllSpices()).rejects.toThrow(/API request failed/);
    });
  });
});

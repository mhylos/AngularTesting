import z from 'zod/v4';

export const createPlaceSchema = z.object({
  id: z.number(),
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  locationId: z.number().int().positive('La ubicación debe ser válida'),
});

export const editPlaceSchema = createPlaceSchema;

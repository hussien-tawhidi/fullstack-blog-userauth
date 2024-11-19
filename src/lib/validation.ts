// lib/validation.ts
import { z } from "zod";

export const blogSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(10000, "Description must be less than 500 characters"),
});

export type BlogSchemaType = z.infer<typeof blogSchema>;

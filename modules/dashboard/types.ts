import type { UserRole, Templates } from "@prisma/client";

export interface User {
  id: string;
  name: string | null; // FIX: This is optional in your schema
  email: string;
  image: string | null; // FIX: This is optional in your schema
  role: UserRole; // FIX: Use the UserRole enum from Prisma
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  title: string;
  description: string | null; // FIX: This is optional in your schema
  template: Templates; // FIX: Use the Templates enum from Prisma
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user: User;
  Starmark: { isMarked: boolean }[];
}

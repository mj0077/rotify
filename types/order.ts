import { Prisma } from '@prisma/client';

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';

export interface Order {
  id: number;
  name: string;
  phone: string;
  startDate: string;
  endDate: string;
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
  status: OrderStatus;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface WaitlistEntry {
  id: number;
  name: string;
  phone: string;
  address: string;
  createdAt: string;
}

export interface DashboardStats {
  total: number;
  pending: number;
  confirmed: number;
  active: number;
  completed: number;
  cancelled: number;
  todayOrders: number;
  waitlistTotal: number;
}

export interface DashboardData {
  stats: DashboardStats;
  recentOrders: Order[];
  recentWaitlist: WaitlistEntry[];
}

// Re-export Prisma types for API routes
export type OrderWhereInput = Prisma.OrderWhereInput;
export type OrderUpdateInput = Prisma.OrderUpdateInput;
export type WaitlistEntryWhereInput = Prisma.WaitlistEntryWhereInput;

import { DollarSign, ShoppingCart, Package } from 'lucide-react';

export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
}

export interface SummaryCard {
    title: string;
    value: string;
    icon: React.ComponentType<{ className?: string }>;
}

export interface Store {
    id: string;
    name: string;
    description: string;
}

export const products: Product[] = [
    { id: '1', name: 'Product 1', price: 19.99, image: '/placeholder.svg' },
    { id: '2', name: 'Product 2', price: 29.99, image: '/placeholder.svg' },
    { id: '3', name: 'Product 3', price: 39.99, image: '/placeholder.svg' },
    { id: '4', name: 'Product 4', price: 49.99, image: '/placeholder.svg' },
];

export const summaryCards: SummaryCard[] = [
    { title: 'Total Revenue', value: '$1,234.56', icon: DollarSign },
    { title: 'Total Orders', value: '156', icon: ShoppingCart },
    { title: 'Total Products', value: '48', icon: Package },
];

export const stores: Store[] = [
    { id: '1', name: 'Store 1', description: 'This is store 1' },
    { id: '2', name: 'Store 2', description: 'This is store 2' },
    { id: '3', name: 'Store 3', description: 'This is store 3' },
];


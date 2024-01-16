export const SCHEMA = {
    PRODUCT: [
        { name: 'name', type: 'string', min: 3, max: 50 },
        { name: 'description', type: 'string', min: 10, max: 2000 },
        { name: 'price', type: 'number', min: 1, max: 300000 },
        { name: 'category', type: 'string' }
    ],
} 

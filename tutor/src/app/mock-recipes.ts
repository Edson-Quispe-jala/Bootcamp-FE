import { RecipeModel } from './models';
export const MOCK_RECIPES: RecipeModel[] = [
    {
        id: 1,
        name: 'Spaghetti Carbonara',
        description: 'A classic Italian pastadish.',
        imgUrl: 'https://www.giallozafferano.it/images/241-24151/Spaghetti-alla-Carbonara_650x433_wm.jpg',
        isFavorite: true,
        ingredients: [
            { name: 'Spaghetti', quantity: 200, unit: 'g' },
            { name: 'Guanciale', quantity: 100, unit: 'g' },
            { name: 'Egg Yolks', quantity: 4, unit: 'each' },
            { name: 'Pecorino Romano Cheese', quantity: 50, unit: 'g' },
            { name: 'Black Pepper', quantity: 1, unit: 'tsp' },
        ],
    },
    {
        id: 2,
        name: 'Caprese Salad',
        description: 'A simple and refreshingItalian salad.',
        imgUrl: 'https://images.unsplash.com/photo-1592489637182-8c172d6d7826?q=80&w=1000&auto=format&fit=crop',
        isFavorite: false,
        ingredients: [
            { name: 'Tomatoes', quantity: 4, unit: 'each' },
            { name: 'Fresh Mozzarella', quantity: 200, unit: 'g' },
            { name: 'Fresh Basil', quantity: 1, unit: 'bunch' },
            { name: 'Extra Virgin Olive Oil', quantity: 2, unit: 'tbsp' },
        ],
    },
];
export interface CardData {
    id: string;
    name: string;
    desc: string;
    card_images: CardImage[];
    card_prices: CardPrice[];
    frameType: string;
    type: string;
    atk?: number;
    def?: number;
    level?: number;
    race?: string;
    attribute?: string;
    typeline?: string[];
}

export interface CardImage {
    id: string;
    image_url: string;
    image_url_cropped: string;
    image_url_small: string;
}

export interface CardPrice {
    cardmarket_price: string;
    tcgplayer_price: string;
    ebay_price: string;
    amazon_price: string;
    coolstuffinc_price: string;
    goat_price: string;
}


export const cardTypes = [
    'Spell Card',
    'Trap Card',
    'Normal Monster',
    'Effect Monster',
    'Ritual Monster',
    'Fusion Monster',
    'Synchro Monster',
    'Xyz Monster',
    'Pendulum Effect Monster',
    'Pendulum Effect Ritual Monster',
    'Pendulum Flip Effect Monster',
    'Pendulum Fusion Monster',
    'Pendulum Synchro Monster',
    'Pendulum Xyz Monster',
    'Link Monster',
    'Token'
];

export const cardAttributes = ['DARK', 'LIGHT', 'WIND', 'WATER', 'FIRE', 'EARTH', 'DIVINE'];
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
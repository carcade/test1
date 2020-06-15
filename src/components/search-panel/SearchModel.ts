export enum RealtyType {
    Office = 'office',
    Flat = 'flat',
    House = 'house',
}

export enum PaymentPeriod {
    Day = 'day',
    Month = 'month',
}

export enum SearchType {
    Basic = 'basic',
    ByName = 'by-name',
}

export enum DealType {
    Buy = 'buy',
    Rent = 'rent',
    Sell = 'sell',
}

/**
 * Модель данных для поискового запроса
 */
export interface SearchModel {
    searchType: SearchType;
    city?: string;
    dealType?: DealType;
    realtyType?: RealtyType;
    priceFrom?: string;
    priceTo?: string;
    paymentPeriod?: PaymentPeriod;
    sizeFrom?: string;
    sizeTo?: string;
    searchText?: string;
}

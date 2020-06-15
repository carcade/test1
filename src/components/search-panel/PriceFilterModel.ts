import {PaymentPeriod} from 'src/components/search-panel/SearchModel';

export default interface PriceFilterModel {
    from: string;
    to: string;
    paymentPeriod: PaymentPeriod;
}

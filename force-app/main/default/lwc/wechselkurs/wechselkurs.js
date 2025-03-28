import { LightningElement } from 'lwc';

export default class Wechselkurs extends LightningElement {
    isLoading = false;
    exchangeRates = [
        {"Country": "USA", "ExchangeRate": 1.0},
        {"Country": "Japan", "ExchangeRate": 110.5},
        {"Country": "Germany", "ExchangeRate": 0.85}
    ]
}
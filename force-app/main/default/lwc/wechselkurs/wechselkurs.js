import { LightningElement, wire } from 'lwc';
import getExchangeRate from '@salesforce/apex/wechselkurs_Ctr.getExchangeRate';

export default class Wechselkurs extends LightningElement {
    isLoading = true;
    exchangeRates = [
        {"Country": "USA", "ExchangeRate": 1.0},
        {"Country": "Japan", "ExchangeRate": 110.5},
        {"Country": "Germany", "ExchangeRate": 0.85}
    ]

    /**
    @wire(getExchangeRate)
    wiredGetExchangeRate({error, data}) {
        if(data) {
            this.exchangeRates = this.formatExchangeRate(data);
            this.isLoading = false;
        } else {
            this.error = error;
            this.exchangeRates = [];
        }
    }*/
        
       
    connectedCallback() {
        const response = {
            base: "EUR",
            date: "2025-03-28",
            rates: {
                "USD": 1.0,
                "JPY": 110.5,
                "EUR": 0.85,
                "DSD": 1.0,
                "DVA": 110.5,
                "GEA": 0.85,
                "HES": 1.0,
                "DCS": 110.5,
                "BFG": 0.85,
                "ERA": 1.0,
                "DGA": 110.5,
                "HRS": 0.85,
            },
            success: true,
            timestamp: 1743152944
        };

        this.exchangeRates = this.formatExchangeRate(response);
        this.isLoading = false;
    }

    formatExchangeRate(response){
        const formatedExchangeRates = Object.keys(response.rates).map(currency => {
            return {
                "Country": currency,
                "ExchangeRate": response.rates[currency]
            };
        });
        return formatedExchangeRates;
    }

}
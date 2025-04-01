/**
* @name wechselkurs
* @type Lightning Web Component
* @description Lightning Web Component for the wechselkurs Component
*
* @version 31.03.2025
* @author Alec Damm
*/

import { LightningElement, wire } from 'lwc';
import getExchangeRate from '@salesforce/apex/wechselkurs_Ctr.getExchangeRate';
import Country from '@salesforce/label/c.Country'
import ExchangeRate from '@salesforce/label/c.ExchangeRate'
import ExchangeRates from '@salesforce/label/c.ExchangeRates'
import Currency from '@salesforce/label/c.Currency'
import Search from '@salesforce/label/c.Search'

export default class Wechselkurs extends LightningElement {
    isLoading = true;
    exchangeRates = []
    filteredRates = []

    sortDirection = 'asc'
    sortedBy = ''
    countrySorted = false;
    exchangeRateSorted = false;

    label = {
        Country,
        ExchangeRate,
        ExchangeRates,
        Currency,
        Search
    }

    @wire(getExchangeRate)
    wiredGetExchangeRate({error, data}) {
        if(data) {
            this.exchangeRates = this.formatExchangeRate(data);
            this.filteredRates = this.exchangeRates;
            this.isLoading = false;
            } else {
                this.error = error;
                this.exchangeRates = [];
                }
                }
                
    /**
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
        this.filteredRates = this.exchangeRates;
        this.isLoading = false;
    }
    */
    
    formatExchangeRate(response){
        const formatedExchangeRates = Object.keys(response.rates).map(currency => {
            return {
                "Country": currency,
                "ExchangeRate": response.rates[currency]
            };
        });
        return formatedExchangeRates;
    }

    handleSearch(event) {
        this.searchTerm = event.target.value.toLowerCase();
        this.filteredRates = this.exchangeRates.filter(rate => 
            rate.Country.toLowerCase().includes(this.searchTerm) ||
            rate.ExchangeRate.toString().includes(this.searchTerm)
        );
        this.handleSort(event);
    }

    handleSort(event) {
        const field = event.target.dataset.field;
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        this.countrySorted = field === 'Country' ? true : false;
        this.exchangeRateSorted = field === 'ExchangeRate' ? true : false;
        this.sortedBy = field;

        this.filteredRates = [...this.filteredRates].sort((a, b) => {
            let valueA = a[field];
            let valueB = b[field];

            if (field === 'ExchangeRate') {
                valueA = parseFloat(valueA);
                valueB = parseFloat(valueB);
            }

            if(this.sortDirection === 'asc') {
                return valueA > valueB ? 1 : -1;
            } else {
                return valueA < valueB ? 1 : -1;
            }
        });
    }

    get sortedColumnCountry() {
        return this.sortedBy === 'Country' ? 'sorted-column' : '';
    }

    get sortedColumnExchangeRate() {
        return this.sortedBy === 'ExchangeRate' ? 'sorted-column' : '';
    }

    get sortIcon() {
        return this.sortDirection === 'asc' ? 'utility:arrowup' : 'utility:arrowdown';
    }

}
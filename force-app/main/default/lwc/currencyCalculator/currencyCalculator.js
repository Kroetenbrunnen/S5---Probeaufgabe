/**
* @name currencyCalculator
* @type Lightning Web Component
* @description Lightning Web Component for the Currency Calculator
*
* @version 01.04.2025
* @author Alec Damm
*/

import { LightningElement, wire } from 'lwc';
import convertCurrency from '@salesforce/apex/wechselkurs_Ctr.convertCurrency';
import CurrencyConverter from '@salesforce/label/c.CurrencyConverter'
import 	FromCurrency from '@salesforce/label/c.FromCurrency'
import 	ToCurrency from '@salesforce/label/c.ToCurrency'
import 	Amount from '@salesforce/label/c.Amount'
import 	ConvertedAmount from '@salesforce/label/c.ConvertedAmount'
import 	Convert from '@salesforce/label/c.Convert'

export default class CurrencyCalculator extends LightningElement {
    currencyOptions = [  { label: 'United Arab Emirates Dirham', value: 'AED' },
                        { label: 'Afghan Afghani', value: 'AFN' },
                        { label: 'Albanian Lek', value: 'ALL' },
                        { label: 'Armenian Dram', value: 'AMD' },
                        { label: 'Netherlands Antillean Guilder', value: 'ANG' },
                        { label: 'Angolan Kwanza', value: 'AOA' },
                        { label: 'Argentine Peso', value: 'ARS' },
                        { label: 'Australian Dollar', value: 'AUD' },
                        { label: 'Aruban Florin', value: 'AWG' },
                        { label: 'Azerbaijani Manat', value: 'AZN' },
                        { label: 'Bosnia-Herzegovina Convertible Mark', value: 'BAM' },
                        { label: 'Barbadian Dollar', value: 'BBD' },
                        { label: 'Bangladeshi Taka', value: 'BDT' },
                        { label: 'Bulgarian Lev', value: 'BGN' },
                        { label: 'Bahraini Dinar', value: 'BHD' },
                        { label: 'Burundian Franc', value: 'BIF' },
                        { label: 'Bermudian Dollar', value: 'BMD' },
                        { label: 'Brunei Dollar', value: 'BND' },
                        { label: 'Bolivian Boliviano', value: 'BOB' },
                        { label: 'Brazilian Real', value: 'BRL' },
                        { label: 'Bahamian Dollar', value: 'BSD' },
                        { label: 'Bitcoin', value: 'BTC' },
                        { label: 'Bhutanese Ngultrum', value: 'BTN' },
                        { label: 'Botswanan Pula', value: 'BWP' },
                        { label: 'Belarusian Ruble', value: 'BYN' },
                        { label: 'Belarusian Ruble (old)', value: 'BYR' },
                        { label: 'Belize Dollar', value: 'BZD' },
                        { label: 'Canadian Dollar', value: 'CAD' },
                        { label: 'Congolese Franc', value: 'CDF' },
                        { label: 'Swiss Franc', value: 'CHF' },
                        { label: 'Chilean Unit of Account (UF)', value: 'CLF' },
                        { label: 'Chilean Peso', value: 'CLP' },
                        { label: 'Chinese Yuan', value: 'CNY' },
                        { label: 'Chinese Yuan (Offshore)', value: 'CNH' },
                        { label: 'Colombian Peso', value: 'COP' },
                        { label: 'Costa Rican Colón', value: 'CRC' },
                        { label: 'Cuban Convertible Peso', value: 'CUC' },
                        { label: 'Cuban Peso', value: 'CUP' },
                        { label: 'Cape Verdean Escudo', value: 'CVE' },
                        { label: 'Czech Republic Koruna', value: 'CZK' },
                        { label: 'Djiboutian Franc', value: 'DJF' },
                        { label: 'Danish Krone', value: 'DKK' },
                        { label: 'Dominican Peso', value: 'DOP' },
                        { label: 'Algerian Dinar', value: 'DZD' },
                        { label: 'Egyptian Pound', value: 'EGP' },
                        { label: 'Eritrean Nakfa', value: 'ERN' },
                        { label: 'Ethiopian Birr', value: 'ETB' },
                        { label: 'Euro', value: 'EUR' },
                        { label: 'Fijian Dollar', value: 'FJD' },
                        { label: 'Falkland Islands Pound', value: 'FKP' },
                        { label: 'British Pound Sterling', value: 'GBP' },
                        { label: 'Georgian Lari', value: 'GEL' },
                        { label: 'Guernsey Pound', value: 'GGP' },
                        { label: 'Ghanaian Cedi', value: 'GHS' },
                        { label: 'Gibraltar Pound', value: 'GIP' },
                        { label: 'Gambian Dalasi', value: 'GMD' },
                        { label: 'Guinean Franc', value: 'GNF' },
                        { label: 'Guatemalan Quetzal', value: 'GTQ' },
                        { label: 'Guyanaese Dollar', value: 'GYD' },
                        { label: 'Hong Kong Dollar', value: 'HKD' },
                        { label: 'Honduran Lempira', value: 'HNL' },
                        { label: 'Croatian Kuna', value: 'HRK' },
                        { label: 'Haitian Gourde', value: 'HTG' },
                        { label: 'Hungarian Forint', value: 'HUF' },
                        { label: 'Indonesian Rupiah', value: 'IDR' },
                        { label: 'Israeli New Sheqel', value: 'ILS' },
                        { label: 'Isle of Man Pound', value: 'IMP' },
                        { label: 'Indian Rupee', value: 'INR' },
                        { label: 'Iraqi Dinar', value: 'IQD' },
                        { label: 'Iranian Rial', value: 'IRR' },
                        { label: 'Icelandic Króna', value: 'ISK' },
                        { label: 'Jersey Pound', value: 'JEP' },
                        { label: 'Jamaican Dollar', value: 'JMD' },
                        { label: 'Jordanian Dinar', value: 'JOD' },
                        { label: 'Japanese Yen', value: 'JPY' },
                        { label: 'Kenyan Shilling', value: 'KES' },
                        { label: 'Kyrgystani Som', value: 'KGS' },
                        { label: 'Cambodian Riel', value: 'KHR' },
                        { label: 'Comorian Franc', value: 'KMF' },
                        { label: 'North Korean Won', value: 'KPW' },
                        { label: 'South Korean Won', value: 'KRW' },
                        { label: 'Kuwaiti Dinar', value: 'KWD' },
                        { label: 'Cayman Islands Dollar', value: 'KYD' },
                        { label: 'Kazakhstani Tenge', value: 'KZT' },
                        { label: 'Laotian Kip', value: 'LAK' },
                        { label: 'Lebanese Pound', value: 'LBP' },
                        { label: 'Sri Lankan Rupee', value: 'LKR' },
                        { label: 'Liberian Dollar', value: 'LRD' },
                        { label: 'Lesotho Loti', value: 'LSL' },
                        { label: 'Lithuanian Litas', value: 'LTL' },
                        { label: 'Latvian Lats', value: 'LVL' },
                        { label: 'Libyan Dinar', value: 'LYD' },
                        { label: 'Moroccan Dirham', value: 'MAD' },
                        { label: 'Moldovan Leu', value: 'MDL' },
                        { label: 'Malagasy Ariary', value: 'MGA' },
                        { label: 'Macedonian Denar', value: 'MKD' },
                        { label: 'Myanma Kyat', value: 'MMK' },
                        { label: 'Mongolian Tugrik', value: 'MNT' },
                        { label: 'Macanese Pataca', value: 'MOP' },
                        { label: 'Mauritanian Ouguiya', value: 'MRU' },
                        { label: 'Mauritian Rupee', value: 'MUR' },
                        { label: 'Maldivian Rufiyaa', value: 'MVR' },
                        { label: 'Malawian Kwacha', value: 'MWK' },
                        { label: 'Mexican Peso', value: 'MXN' },
                        { label: 'Malaysian Ringgit', value: 'MYR' },
                        { label: 'Mozambican Metical', value: 'MZN' },
                        { label: 'Namibian Dollar', value: 'NAD' },
                        { label: 'Nigerian Naira', value: 'NGN' },
                        { label: 'Nicaraguan Córdoba', value: 'NIO' },
                        { label: 'Norwegian Krone', value: 'NOK' },
                        { label: 'Nepalese Rupee', value: 'NPR' },
                        { label: 'New Zealand Dollar', value: 'NZD' },
                        { label: 'Omani Rial', value: 'OMR' },
                        { label: 'Panamanian Balboa', value: 'PAB' },
                        { label: 'Peruvian Nuevo Sol', value: 'PEN' },
                        { label: 'Papua New Guinean Kina', value: 'PGK' },
                        { label: 'Philippine Peso', value: 'PHP' },
                        { label: 'Pakistani Rupee', value: 'PKR' }, 
                        { label: 'Polish Zloty', value: 'PLN' },
                        { label: 'Paraguayan Guarani', value: 'PYG' },
                        { label: 'Qatari Rial', value: 'QAR' },
                        { label: 'Romanian Leu', value: 'RON' },
                        { label: 'Serbian Dinar', value: 'RSD' },
                        { label: 'Russian Ruble', value: 'RUB' },
                        { label: 'Rwandan Franc', value: 'RWF' },
                        { label: 'Saudi Riyal', value: 'SAR' },
                        { label: 'Solomon Islands Dollar', value: 'SBD' },
                        { label: 'Seychellois Rupee', value: 'SCR' },
                        { label: 'Sudanese Pound', value: 'SDG' },
                        { label: 'Swedish Krona', value: 'SEK' },
                        { label: 'Singapore Dollar', value: 'SGD' },
                        { label: 'Saint Helena Pound', value: 'SHP' },
                        { label: 'Sierra Leonean Leone', value: 'SLE' },
                        { label: 'Sierra Leonean Leone (old)', value: 'SLL' },
                        { label: 'Somali Shilling', value: 'SOS' },
                        { label: 'Surinamese Dollar', value: 'SRD' },
                        { label: 'São Tomé and Príncipe Dobra', value: 'STD' },
                        { label: 'Salvadoran Colón', value: 'SVC' },
                        { label: 'Syrian Pound', value: 'SYP' },
                        { label: 'Swazi Lilangeni', value: 'SZL' },
                        { label: 'Thai Baht', value: 'THB' },
                        { label: 'Tajikistani Somoni', value: 'TJS' },
                        { label: 'Turkmenistani Manat', value: 'TMT' },
                        { label: 'Tunisian Dinar', value: 'TND' },
                        { label: 'Tongan Paʻanga', value: 'TOP' },
                        { label: 'Turkish Lira', value: 'TRY' },
                        { label: 'Trinidad and Tobago Dollar', value: 'TTD' },
                        { label: 'New Taiwan Dollar', value: 'TWD' },
                        { label: 'Tanzanian Shilling', value: 'TZS' },
                        { label: 'Ukrainian Hryvnia', value: 'UAH' },
                        { label: 'Ugandan Shilling', value: 'UGX' },
                        { label: 'United States Dollar', value: 'USD' },
                        { label: 'Uruguayan Peso', value: 'UYU' },
                        { label: 'Uzbekistan Som', value: 'UZS' },
                        { label: 'Venezuelan Bolívar Soberano', value: 'VES' },
                        { label: 'Vietnamese Dong', value: 'VND' },
                        { label: 'Vanuatu Vatu', value: 'VUV' },
                        { label: 'Samoan Tala', value: 'WST' },
                        { label: 'CFA Franc BEAC', value: 'XAF' },
                        { label: 'Silver (troy ounce)', value: 'XAG' },
                        { label: 'Gold (troy ounce)', value: 'XAU' },
                        { label: 'East Caribbean Dollar', value: 'XCD' },
                        { label: 'Special Drawing Rights', value: 'XDR' },
                        { label: 'CFA Franc BCEAO', value: 'XOF' },
                        { label: 'CFP Franc', value: 'XPF' },
                        { label: 'Yemeni Rial', value: 'YER' },
                        { label: 'South African Rand', value: 'ZAR' },
                        { label: 'Zambian Kwacha (old)', value: 'ZMK' },
                        { label: 'Zambian Kwacha', value: 'ZMW' },
                        { label: 'Zimbabwean Dollar', value: 'ZWL' }
                    ];

    fromCurrency = '';
    toCurrency = '';
    amount = 0;
    convertedAmount = 0;

    label = {
        CurrencyConverter,
        FromCurrency,
        ToCurrency,
        Amount,
        ConvertedAmount,
        Convert
    }

    handlefromCurrencyChange(event){
        this.fromCurrency = event.target.value;
    }

    handletoCurrencyChange(event){
        this.toCurrency = event.target.value;
    }

    handleAmountChange(event){
        this.amount = event.target.value;
    }

    handleConvertClick(){
        this.convertCurrency();
    }

    async convertCurrency() {
        try {
            const data = await convertCurrency({ fromCurrency: this.fromCurrency, toCurrency: this.toCurrency, amount: this.amount });
            this.convertedAmount = data.result;
            console.log(data.error)
        } catch (error) {
            this.error = error;
        }
    }

}
/**
* @name wechselkurs_Ctr
* @type Controller
* @description Api Controller for the wechselkurs Lightning Web Component
*
* @version 31.03.2025
* @author Alec Damm
*/

public with sharing class wechselkurs_Ctr {
    private static final String FIXER_API_URL = 'http://data.fixer.io/api/';

    @AuraEnabled(cacheable=true)
    public static Map<String, Object> getExchangeRate() {
        String accessKey = API_Setting__mdt.getInstance('Fixer_API').API_Key__c;

        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(FIXER_API_URL + 'latest?access_key=' + accessKey);
        request.setMethod('GET');
        
        HttpResponse response = http.send(request);
        if (response.getStatusCode() == 200) {
            Map<String, Object> result = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            return result;
        } else {
            throw new CalloutException('Failed to get response from Fixer API');
        }
    }

    @AuraEnabled(cacheable=true)
    public static Map<String, Object> convertCurrency(String fromCurrency, String toCurrency, Decimal amount) {
        String accessKey = API_Setting__mdt.getInstance('Fixer_API').API_Key__c;

        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(FIXER_API_URL + 'convert?access_key=' + accessKey + '&from=' + fromCurrency + '&to=' + toCurrency + '&amount=' + amount);
        request.setMethod('GET');
        
        HttpResponse response = http.send(request);
        if (response.getStatusCode() == 200) {
            Map<String, Object> result = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            return result;
        } else {
            throw new CalloutException('Failed to get response from Fixer API');
        }
    }
}
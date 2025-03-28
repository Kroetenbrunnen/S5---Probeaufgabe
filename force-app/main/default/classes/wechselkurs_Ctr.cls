public with sharing class wechselkurs_Ctr {
    private static final String FIXER_API_URL = 'http://data.fixer.io/api/latest';

    @AuraEnabled(cacheable=true)
    public static Map<String, Object> getExchangeRate() {
        String accessKey = API_Setting__mdt.getInstance('Fixer_API').API_Key__c;

        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(FIXER_API_URL + '?access_key=' + accessKey);
        request.setMethod('GET');
        
        HttpResponse response = http.send(request);
        if (response.getStatusCode() == 200) {
            Map<String, Object> result = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            System.debug(result);
            return result;
        } else {
            throw new CalloutException('Failed to get response from Fixer API');
        }
    }
}
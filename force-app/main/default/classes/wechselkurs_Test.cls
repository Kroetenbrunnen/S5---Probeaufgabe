/**
* @name wechselkurs_Test
* @type Test Class
* @description Test class for the wechselkurs apex controller
*
* @version 31.03.2025
* @author Alec Damm
*/

@isTest
private class wechselkurs_Test {
    @isTest
    static void testGetExchangeRate() {
        Test.setMock(HttpCalloutMock.class, new MockHttpResponseGeneratorExchange());

        Map<String, Object> result = wechselkurs_Ctr.getExchangeRate();

        System.assertNotEquals(null, result, 'The result should not be null');
        System.assertEquals(result.get('status'), 'success', 'The status should be success');

        Map <String, Object> rates = new Map<String, Object>{'USD' => 1.2, 'EUR' => 1.0};
        System.assertEquals(result.get('rates'), rates, 'The status should be success');
    }

    @isTest
    static void testGetExchangeRateFail() {
        Test.setMock(HttpCalloutMock.class, new MockHttpResponseGeneratorFail());

        try {
            Map<String, Object> result = wechselkurs_Ctr.getExchangeRate();
            System.assert(false, 'Expected CalloutException was not thrown');
        } catch (CalloutException e) {
            System.assertEquals('Failed to get response from Fixer API', e.getMessage(), 'The exception message should match');
        }
    }

    @isTest
    static void testconvertCurrency() {
        Test.setMock(HttpCalloutMock.class, new MockHttpResponseGeneratorConvert());

        Map<String, Object> result = wechselkurs_Ctr.convertCurrency('USD', 'EUR', 100);

        System.assertNotEquals(null, result, 'The result should not be null');
        System.assertEquals(result.get('success'), true, 'The status should be success');
        System.assertEquals(result.get('result'), 85, 'The status should be success');
    }

    @isTest
    static void testconvertCurrencyFail() {
        Test.setMock(HttpCalloutMock.class, new MockHttpResponseGeneratorFail());

        try {
            Map<String, Object> result = wechselkurs_Ctr.convertCurrency('USD', 'EUR', 100);
            System.assert(false, 'Expected CalloutException was not thrown');
        } catch (CalloutException e) {
            System.assertEquals('Failed to get response from Fixer API', e.getMessage(), 'The exception message should match');
        }
    }

    private class MockHttpResponseGeneratorExchange implements HttpCalloutMock {
        public HttpResponse respond(HttpRequest req) {
            HttpResponse res = new HttpResponse();
            res.setStatusCode(200);
            res.setBody('{"status":"success","rates":{"USD":1.2,"EUR":1.0}}');
            return res;
        }
    }

    private class MockHttpResponseGeneratorConvert implements HttpCalloutMock {
        public HttpResponse respond(HttpRequest req) {
            HttpResponse res = new HttpResponse();
            res.setStatusCode(200);
            res.setBody('{"success":true,"query":{"from":"USD","to":"EUR","amount":100},"info":{"rate":0.85},"result":85}');
            return res;
        }
    }

    private class MockHttpResponseGeneratorFail implements HttpCalloutMock {
        public HttpResponse respond(HttpRequest req) {
            HttpResponse res = new HttpResponse();
            res.setStatusCode(401);
            res.setBody('');
            return res;
        }
    }
}
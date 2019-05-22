const auth0runner = require('auth0-rule-sandbox');
const _ = require('lodash');
let request = require('request');

const stubs = require('../stubs');

const protocols = {
  OidcBasicProfile: 'oidc-basic-profile',
  OidcImplicitProfile: 'oidc-implicit-profile',
  OAuth2ResourceOwner: 'oauth2-resource-owner',
  OAuth2ResourceOwnerJwtBearer: 'oauth2-resource-owner-jwt-bearer',
  OAuth2Password: 'oauth2-password',
  OAuth2RefreshToken: 'oauth2-refresh-token',
  SAMLP: 'samlp',
  WSFed: 'wsfed',
  WSTrustUsernameMixed: 'wstrust-usernamemixed',
  Delegation: 'delegation',
  RedirectCallback: 'redirect-callback',
};

const defaultOptions = ({ user, context } = stubs.passwordLogin) => ({
  user,
  context,
  configuration: {
    PRECOGNITIVE_API_KEY: 'kasf8w-afsafs-1asffw',
    PRECOGNITIVE_PASSWORD: 'test-pw',
    PRECOGNITIVE_USERNAME: 'test'
  },
  globals: {
    request,
    _,

    // This is running in a separate context and the Date
    // constructors differ, so jest matchers can function
    Date
  }
});

const decisionAssertDefaultRecord = () => ({
  baseUrl: 'https://api.precognitive.io',
  json: true,
  timeout: 2000,
  uri: '/v1/decision/login',
  auth: {
    username: 'test',
    password: 'test-pw'
  },
  body: {
    _custom: {
      auth0: {
        user: {
          email: 'jsmith2.precognitive@gmail.com',
          fullName: 'jsmith2.precognitive@gmail.com',
          updated: '2019-05-16T17:37:53.273Z',
        },
        context: {
          authenticationMethods: [
            {
              'name': 'pwd',
              'timestamp': 1558032612724
            }
          ],
          stats: {
            loginsCount: 8
          },
          geoIp: {
            city_name: 'Conshohocken',
            continent_code: 'NA',
            country_code: 'US',
            country_code3: 'USA',
            country_name: 'United States',
            latitude: 40.0825,
            longitude: -75.3044,
            time_zone: 'America/New_York'
          }
        }
      }
    },
    apiKey: 'kasf8w-afsafs-1asffw',
    dateTime: expect.any(Date),
    eventId: '55d8ee1d-2dd3-4aec-95e7-15c80aa101f7',
    ipAddress: '127.0.0.1',
    login: {
      authenticationType: 'password',
      channel: 'web',
      status: 'success',
      usedCaptcha: false,
      usedRememberMe: false,
      userId: '64a454c35ac1932e62e6',
    },
  }
});

[
  'autoDecision.js',
  'decision.js'
].forEach((rule) => {
  describe(`${rule} - API Integration Tests | Api Version: v1.*`, () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('disallows the login if the response is `reject`', (done) => {
      request.__UPDATE_BODY('reject');
      request.__UPDATE_RESPONSE(200);
      request.__TIMEOUT = 0;
      auth0runner(`../rules/${rule}`, defaultOptions(), function (err, user, context) {
        expect(err.isFraud).toBe(true);
        expect(request.post).toHaveBeenCalledTimes(1);
        expect(request.post).toHaveBeenCalledWith(decisionAssertDefaultRecord(), expect.any(Function));
        done();
      });
    });

    it('allows the login if the response is `review`', (done) => {
      request.__UPDATE_BODY('review');
      request.__UPDATE_RESPONSE(200);
      request.__TIMEOUT = 0;
      auth0runner(`../rules/${rule}`, defaultOptions(), function (err, user, context) {
        expect(err).toBe(null);
        expect(request.post).toHaveBeenCalledTimes(1);
        expect(request.post).toHaveBeenCalledWith(decisionAssertDefaultRecord(), expect.any(Function));
        done();
      });
    });

    it('allows the login if the response is `allow`', (done) => {
      request.__UPDATE_BODY('allow');
      request.__UPDATE_RESPONSE(200);
      request.__TIMEOUT = 0;
      auth0runner(`../rules/${rule}`, defaultOptions(), function (err, user, context) {
        expect(err).toBe(null);
        expect(request.post).toHaveBeenCalledTimes(1);
        expect(request.post).toHaveBeenCalledWith(decisionAssertDefaultRecord(), expect.any(Function));
        done();
      });
    });

    it('auto decisions to allow if HTTP status code != 200', (done) => {
      request.__UPDATE_RESPONSE(403);
      request.__TIMEOUT = 0;
      auth0runner(`../rules/${rule}`, defaultOptions(), function (err, user, context) {
        expect(err).toBe(null);
        expect(request.post).toHaveBeenCalledTimes(1);
        expect(request.post).toHaveBeenCalledWith(decisionAssertDefaultRecord(), expect.any(Function));
        done();
      });
    });
  });
});

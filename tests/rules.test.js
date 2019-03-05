const auth0runner = require('auth0-rule-sandbox');
const _ = require('lodash');
let request = require('request');

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

const date = new Date();

const defaultOptions = {
    user: {
        name: 'test',
        app_metadata: {},
        userAgent: "test",
        email: "test@example.com",
        last_ip: "127.0.0.1",
        last_login: date,
        logins_count: 3,
        last_password_reset: date,
        password_set_date: date,
        updated_at: date,
        username: "test-example",
        user_id: "34294892831981",
        user_metadata: {}
    },
    context: {
        clientID: '123456789',
        sessionID: '123456789',
        protocol: protocols.OidcBasicProfile,
        request: {
            userAgent: 'test',
            ip: '127.0.0.1',
            hostname: 'example.com',
            query: '',
            geoip: {
                country_code: 'us',
                country_code3: '',
                country_name: 'murica',
                city_name: 'springville',
                latitude: '0.00',
                longitude: '0.00',
                time_zone: '-400',
                continent_code: 'na',
            }
        }
    },
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
};

const decisionAssertDefaultRecord = {
    baseUrl: "https://api.precognitive.io",
    json: true,
    timeout: 2000,
    uri: "/v1/decision/login",
    auth: {
        username: 'test',
        password: 'test-pw'
    },
    body: {
        apiKey: "kasf8w-afsafs-1asffw",
        dateTime: expect.any(Date),
        eventId: "123456789",
        ipAddress: "127.0.0.1",
        login: {
            authenticationType: "password",
            channel: "web",
            passwordUpdateTime: date,
            status: "success",
            usedCaptcha: false,
            userId: "34294892831981",
        },
    }
};


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
            auth0runner(`../rules/${rule}`, defaultOptions, function (err, user, context) {
                expect(request.post).toHaveBeenCalledTimes(1);
                expect(request.post).toHaveBeenCalledWith(decisionAssertDefaultRecord, expect.any(Function));
                expect(err.isFraudulent).toBe(true);
                done();
            });
        });

        it('allows the login if the response is `review`', (done) => {
            request.__UPDATE_BODY('review');
            request.__UPDATE_RESPONSE(200);
            request.__TIMEOUT = 0;
            auth0runner(`../rules/${rule}`, defaultOptions, function (err, user, context) {
                expect(request.post).toHaveBeenCalledTimes(1);
                expect(request.post).toHaveBeenCalledWith(decisionAssertDefaultRecord, expect.any(Function));
                expect(err).toBe(null);
                done();
            });
        });

        it('allows the login if the response is `allow`', (done) => {
            request.__UPDATE_BODY('allow');
            request.__UPDATE_RESPONSE(200);
            request.__TIMEOUT = 0;
            auth0runner(`../rules/${rule}`, defaultOptions, function (err, user, context) {
                expect(request.post).toHaveBeenCalledTimes(1);
                expect(request.post).toHaveBeenCalledWith(decisionAssertDefaultRecord, expect.any(Function));
                expect(err).toBe(null);
                done();
            });
        });

        it('auto decisions to allow if HTTP status code != 200', (done) => {
            request.__UPDATE_RESPONSE(403);
            request.__TIMEOUT = 0;
            auth0runner(`../rules/${rule}`, defaultOptions, function (err, user, context) {
                expect(request.post).toHaveBeenCalledTimes(1);
                expect(request.post).toHaveBeenCalledWith(decisionAssertDefaultRecord, expect.any(Function));
                expect(err).toBe(null);
                done();
            });
        });
    });

    describe(`${rule} - Protocol Mapping | Api Version: v1.*`, () => {
        afterEach(() => {
            jest.clearAllMocks();
        });

        [
            {input: protocols.OidcBasicProfile, output: 'password'},
            {input: protocols.OidcImplicitProfile, output: 'password'},
            {input: protocols.OAuth2ResourceOwner, output: 'password'},
            {input: protocols.OAuth2Password, output: 'password'},
            {input: protocols.SAMLP, output: 'single_sign_on'},
            {input: protocols.WSFed, output: 'single_sign_on'},
            {input: protocols.WSTrustUsernameMixed, output: 'single_sign_on'},
            {input: protocols.OAuth2RefreshToken, output: 'key'},
            {input: protocols.OAuth2ResourceOwnerJwtBearer, output: 'key'},
            {input: 'any-other', output: 'other'},
        ].forEach((testCase) => {
            it(`correctly maps Auth0Context#protocol from ${testCase.input} to ${testCase.output}`, () => {
                auth0runner(`../rules/${rule}`, defaultOptions, function (err, user, context) {
                    expect(request.post).toHaveBeenCalledWith(_.merge(
                        decisionAssertDefaultRecord,
                        {body: {login: {authenticationType: testCase.outFile}}}
                    ), expect.any(Function));
                    expect(err).toBe(null);
                });
            });
        });
    });
});

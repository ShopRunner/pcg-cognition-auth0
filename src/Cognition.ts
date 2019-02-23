// This is to support the Auth0 Playground
declare var request: typeof import('request');
declare var _: typeof import('lodash');

// Auth0 Types, Interfaces and other structures
// ---------------------------------------------------

/**
 * @description Auth0 authentication protocol potential values
 * @link https://auth0.com/docs/rules/references/context-object
 */
enum ContextProtocol {
    OidcBasicProfile = 'oidc-basic-profile',
    OidcImplicitProfile = 'oidc-implicit-profile',
    OAuth2ResourceOwner = 'oauth2-resource-owner',
    OAuth2ResourceOwnerJwtBearer = 'oauth2-resource-owner-jwt-bearer',
    OAuth2Password = 'oauth2-password',
    OAuth2RefreshToken = 'oauth2-refresh-token',
    SAMLP = 'samlp',
    WSFed = 'wsfed',
    WSTrustUsernameMixed = 'wstrust-usernamemixed',
    Delegation = 'delegation',
    RedirectCallback = 'redirect-callback',
}

/**
 * @description Auth0 Context Object, passed into rules
 * @link https://auth0.com/docs/rules/references/context-object
 */
interface Context {
    sessionID: string,
    protocol: ContextProtocol,
    request: {
        userAgent: string,
        ip: string,
        hostname: string,
        query: string,
        geoip: {
            country_code: string,
            country_code3: string,
            country_name: string,
            city_name: string,
            latitude: string,
            longitude: string,
            time_zone: string,
            continent_code: string,
        }
    }
}

/**
 * @description Auth0 User Object, passed into rules
 * @link https://auth0.com/docs/rules/references/user-object
 */
interface User {
    app_metadata: object,
    created_at: Date,
    email: string,
    last_ip: string,
    last_login: Date,
    logins_count: number,
    last_password_reset: Date,
    password_set_date: Date,
    updated_at: Date,
    username: string,
    user_id: string,
    user_metadata: object
}

/**
 * @description Auth0 Callback passed into rules
 * @link: https://auth0.com/docs/rules#syntax
 */
interface Callback {
    (err: null | Error, user: User, context: Context): void
}

/**
 * @description Auth0 Rule Interface
 * @link https://auth0.com/docs/rules
 */
interface Rule {
    (user: User, context: Context, callback: Callback): void
}

// Cognition SDK
// ---------------------------------------------------

interface DecisionOptions {
    overrides?: CognitionRequest
}

enum Versions {
    v1 = 'v1'
}

const enum DecisionStatus {
    allow = 'allow',
    review = 'review',
    reject = 'reject'
}

const enum Channel {
    web = 'web',
    desktop = 'desktop',
    app = 'app',
}

const enum LoginStatus {
    success = 'success',
    failure = 'failure'
}

const enum AuthenticationType {
    client_storage = 'client_storage',
    password = 'password',
    two_factor = 'two_factor',
    single_sign_on = 'single_sign_on',
    key = 'key',

    other = 'other' // @todo add to API
}

type AuthType = AuthenticationType | null;

interface CognitionResponse {
    score: number,
    decision: DecisionStatus,
    signals: Array<string>
}

interface CognitionRequest {
    apiKey: string,
    eventId: string,
    dateTime: Date,
    ipAddress: string,
    _custom?: object,
    clientPayload?: object,
    login: {
        userId: string,
        channel: Channel,
        usedCaptcha: boolean,
        authenticationType?: AuthType,
        status: LoginStatus,
        passwordUpdateTime: Date,
        userNameUpdateTime?: Date
    }
}

interface ConstructorOptions {
    apiKey: string,
    version: Versions,
    auth: {
        userName: string,
        password: string
    }
}

class PrecognitiveError extends Error {
    public readonly isFraudulent: boolean;

    constructor(isFraudulent = true) {
        super('Precognitive: Reject Authentication');
        this.isFraudulent = isFraudulent;
    }
}

class Cognition {
    private readonly options: ConstructorOptions;

    constructor(options: ConstructorOptions) {
        this.options = options;
    }

    public async decision(user: User, context: Context, options: DecisionOptions): Promise<CognitionResponse> {
        const body = this.buildBody(user, context, options);
        return new Promise((resolve, reject) => {
            request.post({
                baseUrl: _.get(this.options, 'apiUrl', 'https://api.precognitive.io'),
                uri: `/${this.options.version}/decision/login`,
                body,
                json: true,
                auth: {
                    username: this.options.auth.userName,
                    password: this.options.auth.password
                }
            }, (err, response, body) => {
                if (response.statusCode === 200) {
                    resolve(body);
                } else {
                    reject({
                        response,
                        body
                    });
                }
            });
        });
    }

    public async autoDecision(user: User, context: Context, callback: Callback, options: DecisionOptions): Promise<void> {
        try {
            const response: CognitionResponse = await this.decision(user, context, options);
            let err: PrecognitiveError | null = null;

            if (!Cognition.isGoodLogin(response)) {
                err = new PrecognitiveError(true);
            }
            callback(err, user, context);
        } catch (err) {
            callback(err, user, context);
        }
    }

    public static isGoodLogin(decisionResponse: CognitionResponse): boolean {
        return _.includes([DecisionStatus.allow, DecisionStatus.review], decisionResponse.decision);
    }

    private static getAuthenticationType(protocol: ContextProtocol): AuthenticationType | null {
        switch (protocol) {
            case ContextProtocol.OidcBasicProfile:
            case ContextProtocol.OidcImplicitProfile:
            case ContextProtocol.OAuth2ResourceOwner:
            case ContextProtocol.OAuth2Password:
                return AuthenticationType.password;
            case ContextProtocol.SAMLP:
            case ContextProtocol.WSFed:
            case ContextProtocol.WSTrustUsernameMixed:
                return AuthenticationType.single_sign_on;
            case ContextProtocol.OAuth2RefreshToken:
            case ContextProtocol.OAuth2ResourceOwnerJwtBearer:
                return AuthenticationType.key;
            default:
                return null;
            // @todo support `other`
            // return AuthenticationType.other;
        }
    }

    private buildBody(user: User, context: Context, options: DecisionOptions): CognitionRequest {
        return _.merge({
            apiKey: this.options.apiKey,
            eventId: context.sessionID,
            dateTime: new Date(),
            ipAddress: context.request.ip,
            login: {
                userId: user.user_id,
                channel: Channel.web, // @todo in future allow for mapping
                usedCaptcha: false,
                authenticationType: Cognition.getAuthenticationType(context.protocol),
                status: LoginStatus.success,
                passwordUpdateTime: user.last_password_reset
            }
        }, _.get(options, 'overrides', {}));
    }
}



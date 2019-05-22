// This is to support the Auth0 Playground
declare var request: typeof import('request');
declare var _: typeof import('lodash');

// Auth0 Types, Interfaces and other structures
// Context Object - https://auth0.com/docs/rules/references/context-object
// User Object - https://auth0.com/docs/rules/references/user-object
// ---------------------------------------------------

type MetaData = {
    [s: string]: string
}

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

enum ContextAuthenticationMethodName {
    federated = 'federated',
    pwd = 'pwd',
    sms = 'sms',
    email = 'email',
    mfa = 'mfa'
}

type ContextAuthenticationMethod = {
    name: ContextAuthenticationMethodName,
    timestamp: number
}

/**
 * @description Auth0 Context Object, passed into rules
 * @link https://auth0.com/docs/rules/references/context-object
 */
interface Context {
    tenant: string,
    clientID: string,
    clientName: string,
    clientMetadata: MetaData,
    connectionID: string,
    connection: string,
    connectionStrategy: string,
    connectionOptions: {
        tenant_domain: string,
        domain_aliases: Array<string>
    },
    connectionMetadata: MetaData,
    samlConfiguration: object,
    protocol: ContextProtocol,
    stats: object,
    sso: {
        with_auth0: boolean,
        with_dbconn: boolean,
        current_clients?: Array<string>
    },
    accessToken: {
        scope?: Array<string>
    },
    idToken: object,
    original_protocol: string,
    multifactor: object,
    sessionID: string,
    authentication: {
        methods: Array<ContextAuthenticationMethod>
    },
    primaryUser: string,
    request: {
        userAgent: string,
        ip: string,
        hostname: string,
        query: {
            cognition_event_id: string
        },
        body: object,
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
    },
    authorization: { roles: Array<string> }
}

type UserIdentity = {
    connection: string,
    isSocial: boolean,
    provider: string,
    user_id: string
}

/**
 * @description Auth0 User Object, passed into rules
 * @link https://auth0.com/docs/rules/references/user-object
 */
interface User {
    app_metadata: MetaData,
    blocked: boolean,
    created_at: Date,
    email: string,
    email_verified: boolean,
    identities: Array<UserIdentity>
    multifactor: Array<string>,
    name: string,
    nickname: string,
    last_password_reset: Date,
    phone_number: string,
    phone_verified: boolean,
    picture: string,
    updated_at: Date,
    user_id: string,
    user_metadata: MetaData
    username: string,
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

enum ApiVersion {
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
    social_sign_on = 'social_sign_on',
    key = 'key'
}

interface CognitionResponse {
    score: number,
    confidence: number,
    decision: DecisionStatus,
    tokenId: string,
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
        authenticationType?: AuthenticationType | null,
        status: LoginStatus,
        passwordUpdateTime: Date,
        userNameUpdateTime?: Date
    }
}

interface ConstructorOptions {
    apiKey: string,
    version: ApiVersion,
    auth: {
        userName: string,
        password: string
    },
    getUserId?: {
        (user: User, context: Context): string
    },
    timeout?: number,
    logger?: Logger,
    logLevel?: LogLevel
}

enum LogLevel {
    DEBUG = 4,
    INFO = 3,
    WARN = 2,
    ERROR = 1,
    NONE = 0
}

const SDK_NAME = 'Cognition';

class Logger {
    private readonly logLevel: LogLevel;

    constructor(logLevel: LogLevel) {
        this.logLevel = logLevel;
    }

    public debug(...args: any) {
        if (this.logLevel >= LogLevel.DEBUG) {
            console.debug(`${SDK_NAME} DEBUG:`, ...args);
        }
    }

    public info(...args: any) {
        if (this.logLevel >= LogLevel.INFO) {
            console.info(`${SDK_NAME} INFO:`, ...args);
        }
    }

    public warn(...args: any) {
        if (this.logLevel >= LogLevel.WARN) {
            console.warn(`${SDK_NAME} WARN:`, ...args);
        }
    }

    public error(...args: any) {
        if (this.logLevel >= LogLevel.ERROR) {
            console.error(`${SDK_NAME} ERROR:`, ...args);
        }
    }
}

class PrecognitiveError extends Error {
    public readonly isFraud: boolean;

    constructor(isFraud = true) {
        super('Precognitive: Reject Authentication');
        this.isFraud = isFraud;
    }
}

class HttpError extends Error {
    public readonly statusCode: number;
    public readonly response: object | null;
    public readonly body: any | null;

    constructor(statusCode: number, response: object | null = null, body: any = null) {
        super(`${SDK_NAME} - HTTP Error [${statusCode}]`);

        this.statusCode = statusCode;
        this.response = response;
        this.body = body;
    }
}

class Cognition {
    private readonly options: ConstructorOptions;
    private readonly logger: Logger;

    constructor(options: ConstructorOptions) {
        this.options = options;

        if (this.options.logger) {
            this.logger = this.options.logger;
        } else {
            this.logger = new Logger(this.options.logLevel || LogLevel.NONE);
        }
    }

    public static isGoodLogin(decisionResponse: CognitionResponse): boolean {
        return _.includes([DecisionStatus.allow, DecisionStatus.review], decisionResponse.decision);
    }

    public async decision(user: User, context: Context, options: DecisionOptions): Promise<CognitionResponse> {
        const reqBody = this._buildBody(user, context, options);
        this.logger.debug(`REQUEST BODY - ${JSON.stringify(reqBody)}`);
        return new Promise((resolve, reject) => {
            request.post({
                baseUrl: _.get(this.options, 'apiUrl', 'https://api.precognitive.io'),
                uri: `/${this.options.version}/decision/login`,
                body: reqBody,
                json: true,
                timeout: this.options.timeout || 2000,
                auth: {
                    username: this.options.auth.userName,
                    password: this.options.auth.password
                }
            }, (err, response, body) => {
                if (response.statusCode === 200) {
                    this.logger.debug(`RESPONSE BODY - ${JSON.stringify(body)}`);
                    resolve(body);
                } else {
                    const ex = err ? err : new HttpError(response.statusCode, response, body);
                    this.logger.error(ex);
                    resolve({
                        score: 0,
                        confidence: 0,
                        tokenId: "",
                        decision: DecisionStatus.allow,
                        signals: ['failure_to_decision']
                    });
                }
            });
        });
    }

    public async autoDecision(user: User, context: Context, callback: Callback, options: DecisionOptions): Promise<void> {
        try {
            const response = await this.decision(user, context, options);
            let err: PrecognitiveError | null = null;

            if (!Cognition.isGoodLogin(response)) {
                err = new PrecognitiveError(true);
                this.logger.info('Auto-Decision - reject');
            }
            callback(err, user, context);
        } catch (err) {
            this.logger.error(err);

            // Default to auto-allow
            callback(null, user, context);
        }
    }

    /**
     * @description Method to allow override by customers to allow a custom userId (usually via meta_data)
     * @param user
     * @param context
     */
    private _getUserId(user: User, context: Context): string {
        if (this.options.getUserId) {
            return this.options.getUserId(user, context);
        } else {
            return user.user_id;
        }
    }

    private _getAuthenticationType(user: User, context: Context): AuthenticationType | null {
        const latestAuthMethod: ContextAuthenticationMethod = _.last(_.sortBy(context.authentication.methods, 'timestamp'));

        if (latestAuthMethod.name === ContextAuthenticationMethodName.mfa) {
            return AuthenticationType.two_factor;
        } else if (latestAuthMethod.name === ContextAuthenticationMethodName.federated) {
            const identity = _.find(user.identities, {connection: context.connection});
            // check social VS sso
            if (identity.isSocial) {
                return AuthenticationType.social_sign_on;
            } else {
                return AuthenticationType.single_sign_on;
            }
        } else if (_.get(context, 'sso.current_clients', []).length > 0) {
            return AuthenticationType.client_storage;
        } else {
            // Currently password-less still falls to password
            return AuthenticationType.password;
        }
    }

    private _getChannel(user: User, context: Context): Channel {
        return Channel.web;
    }

    private _buildBody(user: User, context: Context, options: DecisionOptions): CognitionRequest {
        return _.merge({
            _custom: {
                // Include Auth0 Specific data points
                auth0: {
                    sdkVersion: '1.0',
                    user: {
                        updated: user.updated_at,
                        fullName: user.name,
                        username: user.username,
                        email: user.email,
                        emailVerified: user.email_verified || false,
                        phoneNumber: user.phone_number,
                        phoneNumberVerified: user.phone_verified || false,
                        blocked: user.blocked || false
                    },
                    context: {
                        authenticationMethods: context.authentication.methods,
                        stats: context.stats,
                        geoIp: context.request.geoip,
                        primaryUser: context.primaryUser,
                        ssoCurrentClients: context.sso.current_clients
                    }
                }
            },
            apiKey: this.options.apiKey,
            eventId: _.get(context.request.query, 'cognition_event_id', null),
            dateTime: new Date(),
            ipAddress: context.request.ip,
            login: {
                userId: this._getUserId(user, context),
                channel: this._getChannel(user, context),
                usedCaptcha: false,
                usedRememberMe: false,
                authenticationType: this._getAuthenticationType(user, context),
                status: LoginStatus.success,
                passwordUpdateTime: user.last_password_reset
            }
        }, _.get(options, 'overrides', {}));
    }
}

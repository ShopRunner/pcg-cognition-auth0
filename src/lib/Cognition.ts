import _ from 'lodash';
import request from 'request';

import {Callback, Context, ContextProtocol, User} from './Auth0';

interface DecisionOptions {
    overrides?: object
}

export enum Versions {
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

interface Response {
    score: number,
    decision: DecisionStatus,
    signals: Array<string>
}

interface Request {
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

export class Cognition {
    private readonly options: ConstructorOptions;

    constructor(options: ConstructorOptions) {
        this.options = options;
    }

    public async decision(user: User, context: Context, options: DecisionOptions): Promise<Response> {
        const body = this.buildBody(user, context, options);
        return new Promise((resolve, reject) => {
            request.post({
                baseUrl: _.get(this.options, 'apiUrl', 'https://api.precognitive.io'),
                uri: `/${this.options.version}/decision/login`,
                body
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
            const response: Response = await this.decision(user, context, options);

            const isGoodLogin = Cognition.isGoodLogin(response);

            if (!isGoodLogin) {
                // mutate to force reauth
            }
            callback(null, user, context);
        } catch (err) {
            callback(err, user, context);
        }
    }

    public static isGoodLogin(decisionResponse: Response): boolean {
        return decisionResponse.decision === DecisionStatus.allow;
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

    private buildBody(user: User, context: Context, options: DecisionOptions): Request {
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



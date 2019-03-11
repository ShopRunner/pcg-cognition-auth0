/**
 * Global Auth0 Configuration Object
 * @typedef {Object} configuration
 * @property {string} PRECOGNITIVE_API_KEY
 * @property {string} PRECOGNITIVE_USERNAME
 * @property {string} PRECOGNITIVE_PASSWORD
 */

/**
 * @typedef {Context} context
 * @typedef {User} user
 * @typedef {Callback} callback
 * @typedef {PrecognitiveError} PrecognitiveError
 * @typedef {Cognition} Cognition
 * @typedef {ApiVersion} ApiVersion
 */

function (user, context, callback) {

    // DO NOT EDIT BELOW THIS LINE
    // --------------------------------

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// Auth0 Types, Interfaces and other structures
// ---------------------------------------------------
/**
 * @description Auth0 authentication protocol potential values
 * @link https://auth0.com/docs/rules/references/context-object
 */
var ContextProtocol;
(function (ContextProtocol) {
    ContextProtocol["OidcBasicProfile"] = "oidc-basic-profile";
    ContextProtocol["OidcImplicitProfile"] = "oidc-implicit-profile";
    ContextProtocol["OAuth2ResourceOwner"] = "oauth2-resource-owner";
    ContextProtocol["OAuth2ResourceOwnerJwtBearer"] = "oauth2-resource-owner-jwt-bearer";
    ContextProtocol["OAuth2Password"] = "oauth2-password";
    ContextProtocol["OAuth2RefreshToken"] = "oauth2-refresh-token";
    ContextProtocol["SAMLP"] = "samlp";
    ContextProtocol["WSFed"] = "wsfed";
    ContextProtocol["WSTrustUsernameMixed"] = "wstrust-usernamemixed";
    ContextProtocol["Delegation"] = "delegation";
    ContextProtocol["RedirectCallback"] = "redirect-callback";
})(ContextProtocol || (ContextProtocol = {}));
var ApiVersion;
(function (ApiVersion) {
    ApiVersion["v1"] = "v1";
})(ApiVersion || (ApiVersion = {}));
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["DEBUG"] = 4] = "DEBUG";
    LogLevel[LogLevel["INFO"] = 3] = "INFO";
    LogLevel[LogLevel["WARN"] = 2] = "WARN";
    LogLevel[LogLevel["ERROR"] = 1] = "ERROR";
    LogLevel[LogLevel["NONE"] = 0] = "NONE";
})(LogLevel || (LogLevel = {}));
var SDK_NAME = 'Cognition';
var Logger = /** @class */ (function () {
    function Logger(logLevel) {
        this.logLevel = logLevel;
    }
    Logger.prototype.debug = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.logLevel >= LogLevel.DEBUG) {
            console.debug.apply(console, [SDK_NAME + " DEBUG:"].concat(args));
        }
    };
    Logger.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.logLevel >= LogLevel.INFO) {
            console.info.apply(console, [SDK_NAME + " INFO:"].concat(args));
        }
    };
    Logger.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.logLevel >= LogLevel.WARN) {
            console.warn.apply(console, [SDK_NAME + " WARN:"].concat(args));
        }
    };
    Logger.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.logLevel >= LogLevel.ERROR) {
            console.error.apply(console, [SDK_NAME + " ERROR:"].concat(args));
        }
    };
    return Logger;
}());
var PrecognitiveError = /** @class */ (function (_super) {
    __extends(PrecognitiveError, _super);
    function PrecognitiveError(isFraudulent) {
        if (isFraudulent === void 0) { isFraudulent = true; }
        var _this = _super.call(this, 'Precognitive: Reject Authentication') || this;
        _this.isFraudulent = isFraudulent;
        return _this;
    }
    return PrecognitiveError;
}(Error));
var HttpError = /** @class */ (function (_super) {
    __extends(HttpError, _super);
    function HttpError(statusCode, response, body) {
        if (response === void 0) { response = null; }
        if (body === void 0) { body = null; }
        var _this = _super.call(this, SDK_NAME + " - HTTP Error [" + statusCode + "]") || this;
        _this.statusCode = statusCode;
        _this.response = response;
        _this.body = body;
        return _this;
    }
    return HttpError;
}(Error));
var Cognition = /** @class */ (function () {
    function Cognition(options) {
        this.options = options;
        if (this.options.logger) {
            this.logger = this.options.logger;
        }
        else {
            this.logger = new Logger(this.options.logLevel || LogLevel.NONE);
        }
    }
    Cognition.prototype.decision = function (user, context, options) {
        return __awaiter(this, void 0, void 0, function () {
            var reqBody;
            var _this = this;
            return __generator(this, function (_a) {
                reqBody = this.buildBody(user, context, options);
                this.logger.debug("REQUEST BODY - " + JSON.stringify(reqBody));
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        request.post({
                            baseUrl: _.get(_this.options, 'apiUrl', 'https://api.precognitive.io'),
                            uri: "/" + _this.options.version + "/decision/login",
                            body: reqBody,
                            json: true,
                            timeout: 2000,
                            auth: {
                                username: _this.options.auth.userName,
                                password: _this.options.auth.password
                            }
                        }, function (err, response, body) {
                            if (response.statusCode === 200) {
                                _this.logger.debug("RESPONSE BODY - " + JSON.stringify(body));
                                resolve(body);
                            }
                            else {
                                var ex = err ? err : new HttpError(response.statusCode, response, body);
                                _this.logger.error(ex);
                                resolve({
                                    score: 0,
                                    confidence: 0,
                                    decision: "allow" /* allow */,
                                    signals: ['unable-to-decision']
                                });
                            }
                        });
                    })];
            });
        });
    };
    Cognition.prototype.autoDecision = function (user, context, callback, options) {
        return __awaiter(this, void 0, void 0, function () {
            var response, err, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.decision(user, context, options)];
                    case 1:
                        response = _a.sent();
                        err = null;
                        if (!Cognition.isGoodLogin(response)) {
                            err = new PrecognitiveError(true);
                            this.logger.info('Auto-Decision - reject');
                        }
                        callback(err, user, context);
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        this.logger.error(err_1);
                        // Default to auto-allow
                        callback(null, user, context);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Cognition.isGoodLogin = function (decisionResponse) {
        return _.includes(["allow" /* allow */, "review" /* review */], decisionResponse.decision);
    };
    Cognition.prototype.getAuthenticationType = function (protocol) {
        switch (protocol) {
            case ContextProtocol.OidcBasicProfile:
            case ContextProtocol.OidcImplicitProfile:
            case ContextProtocol.OAuth2ResourceOwner:
            case ContextProtocol.OAuth2Password:
                return "password" /* password */;
            case ContextProtocol.SAMLP:
            case ContextProtocol.WSFed:
            case ContextProtocol.WSTrustUsernameMixed:
                return "single_sign_on" /* single_sign_on */;
            case ContextProtocol.OAuth2RefreshToken:
            case ContextProtocol.OAuth2ResourceOwnerJwtBearer:
                return "key" /* key */;
            default:
                this.logger.warn('Unable to determine AuthenticationType');
                return null;
            // @todo support `other`
            // return AuthenticationType.other;
        }
    };
    Cognition.prototype.buildBody = function (user, context, options) {
        return _.merge({
            apiKey: this.options.apiKey,
            eventId: context.sessionID,
            dateTime: new Date(),
            ipAddress: context.request.ip,
            login: {
                userId: user.user_id,
                channel: "web" /* web */,
                usedCaptcha: false,
                authenticationType: this.getAuthenticationType(context.protocol),
                status: "success" /* success */,
                passwordUpdateTime: user.last_password_reset
            }
        }, _.get(options, 'overrides', {}));
    };
    return Cognition;
}());


    // DO NOT EDIT ABOVE THIS LINE
    // --------------------------------

    /** @type {Cognition} */
    const pc = new Cognition({
        apiKey: configuration.PRECOGNITIVE_API_KEY,
        version: ApiVersion.v1,
        auth: {
            userName: configuration.PRECOGNITIVE_USERNAME,
            password: configuration.PRECOGNITIVE_PASSWORD
        }
    });

    pc.decision(user, context)
        .then((res) => {
            const isGoodLogin = Cognition.isGoodLogin(res);
            let err = null;

            if (!isGoodLogin) {
                err = new PrecognitiveError(true);
            }

            callback(err, user, context);
        })
        .catch((err) => {
            callback(err, user, context);
        });
}
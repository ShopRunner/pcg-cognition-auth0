'use strict';

const passwordLogin = {
  user: {
    _id: '2058168ee119e1d182b0e868dd2f108d',
    email: 'jsmith2.precognitive@gmail.com',
    clientID: 'D7J3kTpcmuVIbOJ21sDKh1BlHy0yxgDR',
    updated_at: '2019-05-16T17:37:53.273Z',
    user_id: 'auth0|1932e62e664a454c35ac',
    name: 'jsmith2.precognitive@gmail.com',
    picture: 'https://s.gravatar.com/avatar/c9097a30265a6e82fb94ad2f5cc5cac6?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fjs.png',
    nickname: 'jsmith2.precognitive',
    identities: [{
      user_id: '1932e62e664a454c35ac',
      provider: 'auth0',
      connection: 'Username-Password-Authentication',
      isSocial: false
    }],
    created_at: '2019-02-22T16:59:17.843Z',
    user_metadata: {},
    global_client_id: 'GsjvhKVixbhDUs9tavPYGI66b9oQbYow',
    persistent: {}
  },
  context: {
    tenant: 'precognitive-stg',
    clientID: 'D7J3kTpcmuVIbOJ21sDKh1BlHy0yxgDR',
    clientName: 'precognitive.com login',
    clientMetadata: {},
    connection: 'Username-Password-Authentication',
    connectionStrategy: 'auth0',
    connectionID: 'con_vk45ZZC7Sd8MwRqO',
    connectionOptions: {},
    connectionMetadata: {},
    samlConfiguration: {},
    jwtConfiguration: {},
    protocol: 'oidc-basic-profile',
    stats: { loginsCount: 8 },
    sso: { with_auth0: false, with_dbconn: false },
    accessToken: {},
    idToken: {},
    authentication: { methods: [{ name: 'pwd', timestamp: 1558032612724 }] },
    sessionID: 'e8fIMl_DTF-skE6wo-iXnq-BUl2gh8En',
    request: {
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36',
      ip: '50.235.200.180',
      hostname: 'login.precognitive.com',
      query: {
        protocol: 'oauth2',
        redirect_uri: 'https://members.precognitive.com/api/callback',
        client_id: 'D7J3kTpcmuVIbOJ21sDKh1BlHy0yxgDR',
        ac_me: 'site',
        scope: 'openid email',
        ac_ch: 'Website',
        response_type: 'code',
        state: 'g6Fo2SBydDk1ZmoyYUxjUzJuNlJuLUlLbjBUS0xXbUpQa0lsLaN0aWTZIDA4TXlIWi1sTTJTNEZiMFczY0k1UmEwM2hKOFc2QUF3o2NpZNkgRDdKM2tUcGNtdVZJYk9KMjFzREtoMUJsSHkweXhnRFI',
        ac_so: 'Website',
        cognition_event_id: '55d8ee1d-2dd3-4aec-95e7-15c80aa101f7',
        connection: 'Username-Password-Authentication',
        realm: 'Username-Password-Authentication'
      },
      body: {},
      geoip: {
        country_code: 'US',
        country_code3: 'USA',
        country_name: 'United States',
        city_name: 'Conshohocken',
        latitude: 40.0825,
        longitude: -75.3044,
        time_zone: 'America/New_York',
        continent_code: 'NA'
      }
    },
    authorization: { roles: [] }
  }
};

const authorizeLogin = {
  user: passwordLogin.user,
  context: {
    tenant: 'precognitive-stg',
    clientID: 'D7J3kTpcmuVIbOJ21sDKh1BlHy0yxgDR',
    clientName: 'precognitive.com login',
    clientMetadata: {},
    connection: 'Username-Password-Authentication',
    connectionStrategy: 'auth0',
    connectionID: 'con_vk45ZZC7Sd8MwRqO',
    connectionOptions: {},
    connectionMetadata: {},
    samlConfiguration: {},
    jwtConfiguration: {},
    protocol: 'oidc-basic-profile',
    stats: { loginsCount: 8 },
    sso: { with_auth0: false, with_dbconn: false, current_clients: ['D7J3kTpcmuVIbOJ21sDKh1BlHy0yxgDR'] },
    accessToken: {},
    idToken: {},
    authentication: { methods: [{ name: 'pwd', timestamp: 1558032612724 }] },
    sessionID: 'XpChJgmQL5a_sqR9f1cUDn4nfei8Oz7_',
    request: {
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36',
      ip: '50.235.200.180',
      hostname: 'login.precognitive.com',
      query: {
        redirect_uri: 'https://members.precognitive.com/api/callback',
        client_id: 'D7J3kTpcmuVIbOJ21sDKh1BlHy0yxgDR',
        ac_me: 'site',
        scope: 'openid email',
        ac_ch: 'Website',
        response_type: 'code',
        state: 'https://site.precognitive.com/home',
        ac_so: 'Website',
        prompt: 'none',
        cognition_event_id: 'fdc7989f-04ea-4f1a-b02b-26adb134ff0a'
      },
      body: {},
      geoip: {
        country_code: 'US',
        country_code3: 'USA',
        country_name: 'United States',
        city_name: 'Conshohocken',
        latitude: 40.0825,
        longitude: -75.3044,
        time_zone: 'America/New_York',
        continent_code: 'NA'
      }
    },
    authorization: { roles: [] }
  }
};

const googleLogin = {
  user: {
    _id: 'd582aa6509167bc6c7b78d04aea506bd',
    email: 'jsmith2.precognitive@gmail.com',
    email_verified: true,
    name: 'John Smith',
    given_name: 'John',
    family_name: 'Smith',
    picture: 'https://lh5.googleusercontent.com/-XoNJgjIfZ8Y/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rfFU4FJpB_aS2ZZmpM6FTZDa2Pc_Q/mo/photo.jpg',
    locale: 'en',
    clientID: 'D7J3kTpcmuVIbOJ21sDKh1BlHy0yxgDR',
    updated_at: '2019-05-16T17:58:32.253Z',
    user_id: 'google-oauth2|108493911276528311660',
    nickname: 'jsmith2.precognitive',
    identities: [{
      provider: 'google-oauth2',
      access_token: 'oSOMEoGoogleoACCESSoTOKENoya29.GlsLB47ou2tRe_B2IJjpBool-a7y5sNh60Ww3LqOl-dW3T9_Qd_NrFOWDj5IW9',
      expires_in: 3600,
      user_id: '108493911276528311660',
      connection: 'google-oauth2',
      isSocial: true
    }],
    created_at: '2018-10-30T20:10:56.561Z',
    user_metadata: {},
    global_client_id: 'GsjvhKVixbhDUs9tavPYGI66b9oQbYow',
    persistent: {}
  },
  context: {
    tenant: 'precognitive',
    clientID: 'D7J3kTpcmuVIbOJ21sDKh1BlHy0yxgDR',
    clientName: 'precognitive.com login',
    clientMetadata: {},
    connection: 'google-oauth2',
    connectionStrategy: 'google-oauth2',
    connectionID: 'con_oe6g1RTdNE1JdYEf',
    connectionOptions: {},
    connectionMetadata: {},
    samlConfiguration: {},
    jwtConfiguration: {},
    protocol: 'oidc-basic-profile',
    stats: { loginsCount: 33 },
    sso: { with_auth0: false, with_dbconn: false },
    accessToken: {},
    idToken: {},
    authentication: { methods: [{ name: 'federated', timestamp: 1558034384912 }] },
    sessionID: 'jb8PdOGtTJqmaGc6H_H6Nb-FI50035l8',
    request: {
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36',
      ip: '50.235.200.180',
      hostname: 'login.precognitive.com',
      query: {
        protocol: 'oauth2',
        redirect_uri: 'https://members.precognitive.com/api/callback',
        client_id: 'D7J3kTpcmuVIbOJ21sDKh1BlHy0yxgDR',
        ac_me: 'site',
        scope: 'openid email',
        ac_ch: 'Website',
        response_type: 'code',
        state: '/home',
        ac_so: 'Website',
        cognition_event_id: '8d39599c-34ea-498e-b647-ae1ef566f854'
      },
      body: {},
      geoip: {
        country_code: 'US',
        country_code3: 'USA',
        country_name: 'United States',
        city_name: 'Conshohocken',
        latitude: 40.0825,
        longitude: -75.3044,
        time_zone: 'America/New_York',
        continent_code: 'NA'
      }
    },
    authorization: { roles: [] }
  }
};

const facebookLogin = {
  user: {
    _id: '1ab06f588dbb282b7213c841b6e26b23',
    name: 'John Smith',
    email: 'jsmith2.precognitive@yahoo.com',
    clientID: 'D7J3kTpcmuVIbOJ21sDKh1BlHy0yxgDR',
    updated_at: '2019-05-16T18:20:00.491Z',
    picture: 'https://s.gravatar.com/avatar/c70fec5ea307a89d07373974d3832c0b?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fjs.png',
    user_id: 'oauth2|facebook-openid|109342500244738',
    nickname: 'jsmith2.precognitive',
    identities: [{
      provider: 'oauth2',
      user_id: 'facebook-openid|109342500244738',
      access_token: 'SOMEoFacebookoACCESSoTOKENoWclxuShkkfPFz8VcWJnbBYyTZAg4hjZCv4ljdsmcmHde6sE2Bt9RbgBABFHtEUCHhHwAZDZD',
      connection: 'facebook-openid',
      isSocial: true
    }],
    created_at: '2018-08-28T18:11:12.826Z',
    user_metadata: {},
    global_client_id: 'GsjvhKVixbhDUs9tavPYGI66b9oQbYow',
    last_revoke: '2019-04-24T17:56:15.879Z',
    persistent: {}
  },
  context: {
    tenant: 'precognitive',
    clientID: 'D7J3kTpcmuVIbOJ21sDKh1BlHy0yxgDR',
    clientName: 'precognitive.com login',
    clientMetadata: {},
    connection: 'facebook-openid',
    connectionStrategy: 'oauth2',
    connectionID: 'con_H4bnoXuvjfgrh08F',
    connectionOptions: {},
    connectionMetadata: {},
    samlConfiguration: {},
    jwtConfiguration: {},
    protocol: 'oidc-basic-profile',
    stats: { loginsCount: 26 },
    sso: { with_auth0: false, with_dbconn: false },
    accessToken: {},
    idToken: {},
    authentication: { methods: [{ name: 'federated', timestamp: 1558034330106 }] },
    sessionID: 'B07Vyp1Be55NNNezvYbsvgCz_vWENN9F',
    request: {
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36',
      ip: '50.235.200.180',
      hostname: 'login.precognitive.com',
      query: {
        protocol: 'oauth2',
        redirect_uri: 'https://members.precognitive.com/api/callback',
        client_id: 'D7J3kTpcmuVIbOJ21sDKh1BlHy0yxgDR',
        ac_me: 'site',
        scope: 'openid email',
        ac_ch: 'Website',
        response_type: 'code',
        state: '/home',
        ac_so: 'Website',
        cognition_event_id: '29cf8318-3ae2-46f4-92cf-4a4643b31814'
      },
      body: {},
      geoip: {
        country_code: 'US',
        country_code3: 'USA',
        country_name: 'United States',
        city_name: 'Conshohocken',
        latitude: 40.0825,
        longitude: -75.3044,
        time_zone: 'America/New_York',
        continent_code: 'NA'
      }
    },
    authorization: { roles: [] }
  }
};

const yahooLogin = {
  user: {
    _id: 'e492dadf3c2ddfab10db0a8579372b28',
    sub: 'S2YEGZ3DTOVBMWXBFSUONWBJF6',
    name: 'Johnny Smith',
    given_name: 'Johnny',
    family_name: 'Smith',
    locale: 'en-US',
    email: 'jsmith2.precognitive@yahoo.com',
    email_verified: true,
    birthdate: '1980',
    profile_images: {
      image32: 'https://ct.yimg.com/cy/1768/39361574426_98028a_32sq.jpg',
      image64: 'https://ct.yimg.com/cy/1768/39361574426_98028a_64sq.jpg',
      image128: 'https://ct.yimg.com/cy/1768/39361574426_98028a_128sq.jpg',
      image192: 'https://ct.yimg.com/cy/1768/39361574426_98028a_192sq.jpg'
    },
    picture: 'https://ct.yimg.com/cy/1768/39361574426_98028a_192sq.jpg',
    clientID: 'D7J3kTpcmuVIbOJ21sDKh1BlHy0yxgDR',
    updated_at: '2019-05-16T18:42:10.034Z',
    user_id: 'oauth2|yahoo-openid|S2YEGZ3DTOVBMWXBFSUONWBJF6',
    nickname: 'Johnny',
    identities: [{
      provider: 'oauth2',
      access_token: 'SOMEoYahoooACCESSoTOKENopnMeQ5WasBtWyZt41eR9pW_76yLGR0K1Q.gFYiJs4P',
      refresh_token: 'AIyKYVx.LULL0L3SyY62g1jDrKBNTUA7ZeWvMPJ3Uf_Q.kNvLmdt48VXHWc-',
      user_id: 'yahoo-openid|S2YEGZ3DTOVBMWXBFSUONWBJF6',
      connection: 'yahoo-openid',
      isSocial: true
    }],
    created_at: '2018-10-11T14:36:25.427Z',
    user_metadata: {
      memberId: '3e167aa392e6cc9996d5',
      ssoToken: 'u5RM0tsG7XytQ1yI6YeHBFA4hgtkwAFnnl6i08wkUYA=',
      status: 'Member',
      type: 'YAHOO',
      createdDate: '2018-10-11T14:36:25',
      signUpStatus: 'existing',
      creatingConnection: 'yahoo-openid',
      hasMemberAccount: true
    },
    preferred_username: 'jsmith2.precognitive@yahoo.com',
    phone_number: '+12155552424',
    global_client_id: 'GsjvhKVixbhDUs9tavPYGI66b9oQbYow',
    persistent: {}
  },
  context: {
    tenant: 'precognitive',
    clientID: 'D7J3kTpcmuVIbOJ21sDKh1BlHy0yxgDR',
    clientName: 'precognitive.com login',
    clientMetadata: {},
    connection: 'yahoo-openid',
    connectionStrategy: 'oauth2',
    connectionID: 'con_klNfRjfowmOiqTeC',
    connectionOptions: {},
    connectionMetadata: {},
    samlConfiguration: {},
    jwtConfiguration: {},
    protocol: 'oidc-basic-profile',
    stats: { loginsCount: 11 },
    sso: { with_auth0: false, with_dbconn: false },
    accessToken: {},
    idToken: {},
    authentication: { methods: [{ name: 'federated', timestamp: 1558034227248 }] },
    sessionID: '8sIjwptQ06VYqE6RwZaXWHiNvjxUxhh9',
    request: {
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36',
      ip: '50.235.200.180',
      hostname: 'login.precognitive.com',
      query: {
        protocol: 'oauth2',
        redirect_uri: 'https://members.precognitive.com/api/callback',
        client_id: 'D7J3kTpcmuVIbOJ21sDKh1BlHy0yxgDR',
        ac_me: 'site',
        scope: 'openid email',
        ac_ch: 'Website',
        response_type: 'code',
        state: '/home',
        ac_so: 'Website',
        cognition_event_id: 'b5baf08c-46c5-4c63-bf0d-6ca18205ea3e'
      },
      body: {},
      geoip: {
        country_code: 'US',
        country_code3: 'USA',
        country_name: 'United States',
        city_name: 'Conshohocken',
        latitude: 40.0825,
        longitude: -75.3044,
        time_zone: 'America/New_York',
        continent_code: 'NA'
      }
    },
    authorization: { roles: [] }
  }
};

module.exports = {
  passwordLogin,
  googleLogin,
  facebookLogin,
  yahooLogin
};

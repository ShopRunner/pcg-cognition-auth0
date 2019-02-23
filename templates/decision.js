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
 * @typedef {Versions} Versions
 */

function (user, context, callback) {

    // DO NOT EDIT BELOW THIS LINE
    // --------------------------------

<%= contents %>

    // DO NOT EDIT ABOVE THIS LINE
    // --------------------------------

    /** @type {Cognition} */
    const pc = new Cognition({
        apiKey: configuration.PRECOGNITIVE_API_KEY,
        version: Versions.v1,
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
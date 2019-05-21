# Cognition-Auth0

Auth0 provides a universal authentication & authorization platform for web, mobile and legacy applications. Out of the box
Auth0 provides a sandbox where ad hoc code can be executed that Precognitive utilizes to integrate it's Account-Takeover Fraud prevention tool.

**[Auth0 Rules Documentation](https://auth0.com/docs/rules)**

## Logical Overview

Precognitive's API returns a decision of "allow", "review" or "reject", amongst other data points. An error will (should) 
be thrown if the authentication is to be prevented (usually a "reject"). The error will be a custom `PrecognitiveError` that will have a property
called `isFraudulent`. This will return true if Precognitive considers the login to be fraudulent.

### AutoDecision Rule (Preferred installation)

The AutoDecision Rule makes the decision based off preexisting logic managed by the SDK. This is the preferred integration.

### Decision Rule

The Decision Rule allows the developer to access the direct response, either to log/persist the response or the override the 
Precognitive decision.

## Rule Installation 

When installing a Rule due to Auth0's sandbox developers will need to copy the rules in the `/rules` directory. This can be done
by cloning the repository or using the links below.

##### Downloads
* [autoDecision.js](/rules/autoDecision.js)
* [decision.js](/rules/decision.js)

### Configuration

The following configuration values are required to be accessible in the Rule sandbox. These values will be provided by your account
manager or technical contact.
 
* PRECOGNITIVE_API_KEY - API Key is used to tie a request to an application
* PRECOGNITIVE_USERNAME - UserName is used for Basic-Auth 
* PRECOGNITIVE_PASSWORD - Password is used for Basic-Auth

## Cognition Class
aaa

## Client-Side Installation

Auth0 provides a session ID that is accessible in the browser by utilizing the `auth0` cookie. You can retrieve and parse 
the cookie in whatever way is easiest for your team as long as the value is passed along in its current format.

```html
<noscript><img src="https://cdn.ad1x.com/static/clrpxl.gif" style="display: none" /></noscript>
<script type="application/javascript">
  // visit https://developers.precognitive.io/#section/Integration/JavaScriptTag-Deployment to retrieve the full script
  
  // Add the auth0 session ID as the eventId.
  // @note You can use any Cookie parsing lib or vanilla JS.
  _trnu('set', 'eventId', {{ custom_event_id }});
</script>
``` 

Query string
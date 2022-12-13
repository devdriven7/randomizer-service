const randExp = require('randexp').randexp;

let totalTokenLeaks = 0;

const POSTMAN_COLLECTION_ACCESS_KEY = {
    name: 'Postman Collection Access Key',
    category: 'API Key',
    regex: /PMAT-[0-9a-z]{26}\b/,
  },
  TELEGRAM_BOT_TOKEN = {
    name: 'Telegram Bot Token',
    category: 'API Key',
    regex: /\b[0-9]{10}:[a-zA-z-_0-9]{35}\b/,
  },
  AIRTABLE_API_KEY = {
    name: 'Airtable API Key',
    category: 'API Key',
    regex: /\bkey[A-Z0-9]{14}\b/,
  },
  POSTMAN_API_KEY = {
    name: 'Postman API Key',
    category: 'API Key',
    regex: /(PMAK-[a-f0-9]{24}-[a-f0-9]{34})/,
  },
  SQUARE_ACCESS_TOKEN = {
    name: 'Square Access Token',
    category: 'Access Token',
    regex: /sq0atp-[a-z0-9-_\\]{22}(?![a-z0-9-_\\])/,
  },
  NEW_RELIC_USER_KEY = {
    name: 'New Relic User Key',
    category: 'API Key',
    regex: /NRAK-[0-9a-z-_]{27}\b/,
  },
  ZAPIER_WEBHOOK = {
    name: 'Zapier Webhook',
    category: 'Webhook URL',
    regex:
      /https:\/\/(?:www.)?hooks.zapier.com\/hooks\/catch\/[a-z0-9]+\/[a-z0-9]+\//,
  },
  SQUARE_ACCESS_KEY = {
    name: 'Square Access Key',
    category: 'Access Token',
    regex: /sq0idp-[a-z0-9-_]{22}(?![a-z0-9-_])/,
  },
  GOOGLE_API_KEY = {
    name: 'Google API Key',
    category: 'API Key',
    regex: /AIza[0-9a-z-_]{35}\b/,
  },
  STRIPE_SECRET_KEY = {
    name: 'Stripe Secret Key',
    category: 'API Key',
    regex: /sk_live_[0-9a-z]{24}/,
  },
  TWILIO_API_KEY = {
    name: 'Twilio API Key',
    category: 'API Key',
    regex: /\bSK[A-F0-9]{32}\b/,
  },
  STRIPE_RESTRICTED_KEY = {
    name: 'Stripe Restricted Key',
    category: 'API Key',
    regex: /rk_live_[0-9a-z]{24}/,
  },
  BASIC_AUTH = {
    name: 'Basic Auth',
    category: 'Generic Secret',
    regex:
      /Basic ([a-z]+[0-9]|[0-9]+[a-z])[a-z0-9/+]{3,1000}(?![a-z0-9/+-/({})!@#$%^&|*])[=]{0,2}/,
  },
  SENDGRID_API_KEY = {
    name: 'SendGrid API Key',
    category: 'API Key',
    regex: /SG\.[a-z0-9_-]{16,32}\.[a-z0-9-_]{16,64}(?![a-z0-9-_])/,
  },
  UPDATED_DATABRICKS = {
    name: 'Updated Databricks',
    category: 'API Key',
    regex: /\bdapi([a-z0-9]{30})\b/,
  },
  POSTMAN_API = {
    name: 'postman api',
    category: 'API KEY',
    regex: /PMAK-[a-f0-9]{24}-[a-f0-9]{34}/,
  },
  SQUARE_OAUTH_SECRET = {
    name: 'Square OAuth Secret',
    category: 'OAuth Token',
    regex: /sq0csp-[a-z0-9-_\\]{43}(?![a-z0-9-_\\])/,
  },
  EC2_SSH_PRIVATE_KEY = {
    name: 'EC2 SSH Private Key',
    category: 'Cryptographic Key',
    regex:
      /[-]{5}BEGIN EC PRIVATE KEY[-]{5}([\s\S]*?)[-]{5}END EC PRIVATE KEY[-]{5}/,
  },
  SLACK_ACCESS_TOKEN = {
    name: 'Slack Access Token',
    category: 'Access Token',
    regex: /xox[baprs]-([0-9a-z]{10,48})[-0-9a-z]+\b/,
  },
  CLOJARS_DEPLOY_TOKEN = {
    name: 'Clojars Deploy Token',
    category: 'API Key',
    regex: /CLOJARS_[a-f0-9]{60}(?![a-z0-9_])/,
  },
  FIREBASE_CLOUD_MESSAGING_API_KEY = {
    name: 'Firebase Cloud Messaging API Key',
    category: 'API Key',
    regex: /AAAA[A-Za-z0-9_-]{7}:[A-Za-z0-9_-]{140}/,
  },
  AKAMAI_API_KEY = {
    name: 'Akamai API Key',
    category: 'API Key',
    regex: /akab-[a-z0-9]{16}-[a-z0-9]{16}\b/,
  },
  SENDINBLUE_KEY = {
    name: 'Sendinblue Key',
    category: 'API Key',
    regex: /xkeysib-([a-z0-9]{64})-([a-z0-9]{16})(?![a-z0-9-])/,
  },
  RSA_PRIVATE_KEY = {
    name: 'RSA Private Key',
    category: 'Cryptographic Key',
    regex:
      /[-]{5}BEGIN RSA PRIVATE KEY[-]{5}([\s\S]*?)[-]{5}END RSA PRIVATE KEY[-]{5}/,
  },
  GITHUB_ACCESS_TOKEN = {
    name: 'GitHub Access Token',
    category: 'API Key',
    regex: /(ghp_[a-zA-Z0-9]{36})/,
  },
  DSA_PRIVATE_KEY = {
    name: 'DSA Private Key',
    category: 'Cryptographic Key',
    regex:
      /[-]{5}BEGIN DSA PRIVATE KEY[-]{5}([\s\S]*?)[-]{5}END DSA PRIVATE KEY[-]{5}/,
  },
  AUTHORIZATION_AWS_SECRET = {
    name: 'Authorization AWS Secret',
    category: 'Authorization Secret',
    regex: /[0-9a-z+\/]{15,1000}/,
  },
  SHOPIFY_KEY = {
    name: 'Shopify Key',
    category: 'Access Token',
    regex: /shpss_[a-f0-9]{32}(?![a-z0-9-_])/,
  },
  AMAZON_AWS_ACCESS_KEY_ID = {
    name: 'Amazon AWS Access Key ID',
    category: 'API Key',
    regex: /\bAKIA[0-9A-Z]{16}\b/,
  },
  AUTHORIZATION_PASSWORD = {
    name: 'Authorization Password',
    category: 'Authorization Secret',
    regex: /^.{8,1000}$/,
  },
  DATABRICKS_AUTHENTICATION_TOKEN = {
    name: 'Databricks Authentication Token',
    category: 'Access Token',
    regex: /dapi([a-z0-9]{32})\b/,
  },
  TESTING_TOKEN = {
    name: 'Testing Token',
    category: 'API Key',
    regex: /\bdapi([a-z0-9]{30})\b/,
  },
  RAZORPAY_ACCESS_KEY_ID = {
    name: 'RazorPay Access Key ID',
    category: 'API Key',
    regex: /\brzp_live_[A-Z0-9]{14}\b/,
  },
  AUTHORIZATION_SECRET = {
    name: 'Authorization Secret',
    category: 'Authorization Secret',
    regex: /^.{15,1000}$/,
  },
  BEARER_TOKEN = {
    name: 'Bearer Token',
    category: 'Generic Secret',
    regex:
      /bearer ([a-z]+[0-9]|[0-9]+[a-z])[a-z0-9/+_.-]{15,1000}(?![a-z0-9/+.-])/,
  },
  SLACK_WEBHOOK_URL = {
    name: 'Slack Webhook URL',
    category: 'Webhook URL',
    regex:
      /https:\/\/hooks\.slack\.com\/services\/T[a-z0-9_]{8,10}\/B[a-z0-9_]{8,12}\/[a-z0-9_]{1,24}/,
  },
  MICROSOFT_OUTLOOK_TEAM_WEBHOOK_URL = {
    name: 'Microsoft Outlook Team Webhook URL',
    category: 'Webhook URL',
    regex:
      /https:\/\/outlook\.office\.com\/webhook\/([a-f0-9]{8})-([a-f0-9]{4})-([a-f0-9]{4})-([a-f0-9]{4})-([a-f0-9]{12})@([a-f0-9]{8})-([a-f0-9]{4})-([a-f0-9]{4})-([a-f0-9]{4})-([a-f0-9]{12})(?![a-z0-9-_])/,
  },
  AMAZON_MWS_TOKEN = {
    name: 'Amazon MWS Token',
    category: 'Access Token',
    regex:
      /amzn.mws.([0-9a-f]{8})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{12})(?![a-z0-9-])/,
  },
  AWS_ACCESS_KEY = {
    name: 'AWS Access Key',
    category: 'Authorization Secret',
    regex: /A[S|K]IA[0-9a-z]{15,1000}\b/,
  },
  TYPEFORM_API_KEY = {
    name: 'Typeform API Key',
    category: 'API Key',
    regex: /tfp_[0-9a-z-_]{59}\b/,
  },
  PGP_PRIVATE_KEY = {
    name: 'PGP Private Key',
    category: 'Cryptographic Key',
    regex:
      /[-]{5}BEGIN PGP PRIVATE KEY BLOCK[-]{5}([\s\S]*?)[-]{5}END PGP PRIVATE KEY BLOCK[-]{5}/,
  },
  AKAMAI_AUTHORIZATION_TOKEN = {
    name: 'Akamai Authorization Token',
    category: 'Authorization Secret',
    regex: /akaa[0-9a-z-]{15,1000}\b/,
  },
  OPENSSH_PRIVATE_KEY = {
    name: 'OpenSSH Private Key',
    category: 'API Key',
    regex:
      /[-]{5}BEGIN OPENSSH PRIVATE KEY[-]{5}([\\s\\S]*?)[-]{5}END OPENSSH PRIVATE KEY[-]{5}/,
  },
  GITHUB_PERSONAL_ACCESS_TOKEN = {
    name: 'GitHub Personal Access Token',
    category: 'API Key',
    regex: /\bghp_[A-Z0-9]{36}\b/,
  },
  GOOGLE_OAUTH_TOKEN = {
    name: 'Google OAuth Token',
    category: 'Access Token',
    regex: /[0-9]+-[0-9a-z_]{32}\.apps\.googleusercontent\.com/,
  };

const APIKeyTokens = [
  POSTMAN_COLLECTION_ACCESS_KEY,
  TELEGRAM_BOT_TOKEN,
  AIRTABLE_API_KEY,
  POSTMAN_API_KEY,
  SQUARE_ACCESS_TOKEN,
  NEW_RELIC_USER_KEY,
  SQUARE_ACCESS_KEY,
  GOOGLE_API_KEY,
  STRIPE_SECRET_KEY,
  TWILIO_API_KEY,
  STRIPE_RESTRICTED_KEY,
  SENDGRID_API_KEY,
  POSTMAN_API,
  EC2_SSH_PRIVATE_KEY,
  SLACK_ACCESS_TOKEN,
  CLOJARS_DEPLOY_TOKEN,
  FIREBASE_CLOUD_MESSAGING_API_KEY,
  AKAMAI_API_KEY,
  SENDINBLUE_KEY,
  RSA_PRIVATE_KEY,
  GITHUB_ACCESS_TOKEN,
  DSA_PRIVATE_KEY,
  SHOPIFY_KEY,
  DATABRICKS_AUTHENTICATION_TOKEN,
  TESTING_TOKEN,
  AUTHORIZATION_SECRET,
  AMAZON_MWS_TOKEN,
  AWS_ACCESS_KEY,
  TYPEFORM_API_KEY,
  PGP_PRIVATE_KEY,
  AKAMAI_AUTHORIZATION_TOKEN,
  OPENSSH_PRIVATE_KEY,
  GITHUB_PERSONAL_ACCESS_TOKEN,
  GOOGLE_OAUTH_TOKEN,
];

const allTokenList = [
  POSTMAN_COLLECTION_ACCESS_KEY,
  TELEGRAM_BOT_TOKEN,
  AIRTABLE_API_KEY,
  POSTMAN_API_KEY,
  SQUARE_ACCESS_TOKEN,
  NEW_RELIC_USER_KEY,
  ZAPIER_WEBHOOK,
  SQUARE_ACCESS_KEY,
  GOOGLE_API_KEY,
  STRIPE_SECRET_KEY,
  TWILIO_API_KEY,
  STRIPE_RESTRICTED_KEY,
  BASIC_AUTH,
  SENDGRID_API_KEY,
  UPDATED_DATABRICKS,
  POSTMAN_API,
  SQUARE_OAUTH_SECRET,
  EC2_SSH_PRIVATE_KEY,
  SLACK_ACCESS_TOKEN,
  CLOJARS_DEPLOY_TOKEN,
  FIREBASE_CLOUD_MESSAGING_API_KEY,
  AKAMAI_API_KEY,
  SENDINBLUE_KEY,
  RSA_PRIVATE_KEY,
  GITHUB_ACCESS_TOKEN,
  DSA_PRIVATE_KEY,
  AUTHORIZATION_AWS_SECRET,
  SHOPIFY_KEY,
  AMAZON_AWS_ACCESS_KEY_ID,
  AUTHORIZATION_PASSWORD,
  DATABRICKS_AUTHENTICATION_TOKEN,
  TESTING_TOKEN,
  RAZORPAY_ACCESS_KEY_ID,
  AUTHORIZATION_SECRET,
  BEARER_TOKEN,
  SLACK_WEBHOOK_URL,
  MICROSOFT_OUTLOOK_TEAM_WEBHOOK_URL,
  AMAZON_MWS_TOKEN,
  AWS_ACCESS_KEY,
  TYPEFORM_API_KEY,
  PGP_PRIVATE_KEY,
  AKAMAI_AUTHORIZATION_TOKEN,
  OPENSSH_PRIVATE_KEY,
  GITHUB_PERSONAL_ACCESS_TOKEN,
  GOOGLE_OAUTH_TOKEN,
];

module.exports = {
  POSTMAN_COLLECTION_ACCESS_KEY,
  TELEGRAM_BOT_TOKEN,
  AIRTABLE_API_KEY,
  POSTMAN_API_KEY,
  SQUARE_ACCESS_TOKEN,
  NEW_RELIC_USER_KEY,
  ZAPIER_WEBHOOK,
  SQUARE_ACCESS_KEY,
  GOOGLE_API_KEY,
  STRIPE_SECRET_KEY,
  TWILIO_API_KEY,
  STRIPE_RESTRICTED_KEY,
  BASIC_AUTH,
  SENDGRID_API_KEY,
  UPDATED_DATABRICKS,
  POSTMAN_API,
  SQUARE_OAUTH_SECRET,
  EC2_SSH_PRIVATE_KEY,
  SLACK_ACCESS_TOKEN,
  CLOJARS_DEPLOY_TOKEN,
  FIREBASE_CLOUD_MESSAGING_API_KEY,
  AKAMAI_API_KEY,
  SENDINBLUE_KEY,
  RSA_PRIVATE_KEY,
  GITHUB_ACCESS_TOKEN,
  DSA_PRIVATE_KEY,
  AUTHORIZATION_AWS_SECRET,
  SHOPIFY_KEY,
  AMAZON_AWS_ACCESS_KEY_ID,
  AUTHORIZATION_PASSWORD,
  DATABRICKS_AUTHENTICATION_TOKEN,
  TESTING_TOKEN,
  RAZORPAY_ACCESS_KEY_ID,
  AUTHORIZATION_SECRET,
  BEARER_TOKEN,
  SLACK_WEBHOOK_URL,
  MICROSOFT_OUTLOOK_TEAM_WEBHOOK_URL,
  AMAZON_MWS_TOKEN,
  AWS_ACCESS_KEY,
  TYPEFORM_API_KEY,
  PGP_PRIVATE_KEY,
  AKAMAI_AUTHORIZATION_TOKEN,
  OPENSSH_PRIVATE_KEY,
  GITHUB_PERSONAL_ACCESS_TOKEN,
  GOOGLE_OAUTH_TOKEN,
  APIKeyTokens,
  getTokenLeakCount: () => {
    return totalTokenLeaks;
  },
  generateToken: (customToken) => {
    const randomIdx = Math.floor(Math.random() * (allTokenList.length - 1));
    const randomToken = customToken || allTokenList[randomIdx];

    totalTokenLeaks++;

    return {
      type: randomToken.name,
      category: randomToken.category,
      regex: randomToken.regex.toString(),
      value: randExp(randomToken.regex),
    };
  },
};

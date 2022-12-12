const randExp = require('randexp').randexp;

const customRegexes = [{
    "name": "Postman Collection Access Key",
    "category": "API Key",
    "regex": /PMAT-[0-9a-z]{26}\\b/
  }, {
    "name": "Telegram Bot Token",
    "category": "API Key",
    "regex": /\\b[0-9]{10}:[a-zA-z-_0-9]{35}\\b/
  }, {
    "name": "Airtable API Key",
    "category": "API Key",
    "regex": /\\bkey[A-Z0-9]{14}\\b/
  }, {
    "name": "Postman API Key",
    "category": "API Key",
    "regex": /(PMAK-[a-f0-9]{24}-[a-f0-9]{34})/
  }, {
    "name": "Square Access Token",
    "category": "Access Token",
    "regex": /sq0atp-[a-z0-9-_\\\\]{22}(?![a-z0-9-_\\\\])/
  }, {
    "name": "New Relic User Key",
    "category": "API Key",
    "regex": /NRAK-[0-9a-z-_]{27}\\b/
  }, {
    "name": "Zapier Webhook",
    "category": "Webhook URL",
    "regex": /https://(?:www.)?hooks.zapier.com/hooks/catch/[a-z0-9]+/[a-z0-9]+//
  }, {
    "name": "Square Access Key",
    "category": "Access Token",
    "regex": /sq0idp-[a-z0-9-_]{22}(?![a-z0-9-_])/
  }, {
    "name": "Google API Key",
    "category": "API Key",
    "regex": /AIza[0-9a-z-_]{35}\\b/
  }, {
    "name": "Telegram Bot Access Token",
    "category": "Token",
    "regex": /(?<![0-9])[0-9]{10}:[A]{2}[A-Z-_0-9]{33}(?![A-Z])/
  }, {
    "name": "Stripe Secret Key",
    "category": "API Key",
    "regex": /sk_live_[0-9a-z]{24}/
  }, {
    "name": "Twilio API Key",
    "category": "API Key",
    "regex": /(SK[0-9a-fA-F]{32})/
  }, {
    "name": "Twilio API Key",
    "category": "API Key",
    "regex": /\\bSK[A-F0-9]{32}\\b/
  }, {
    "name": "Stripe Restricted Key",
    "category": "API Key",
    "regex": /rk_live_[0-9a-z]{24}/
  }, {
    "name": "Basic Auth",
    "category": "Generic Secret",
    "regex": /Basic ([a-z]+[0-9]|[0-9]+[a-z])[a-z0-9/+]{3,1000}(?![a-z0-9/+-/({})!@#$%^&|*])[=]{0,2}/
  }, {
    "name": "SendGrid API Key",
    "category": "API Key",
    "regex": /SG\\.[a-z0-9_-]{16,32}\\.[a-z0-9-_]{16,64}(?![a-z0-9-_])/
  }, {
    "name": "Telegram Bot Token",
    "category": "API Key",
    "regex": /([0-9]{10}:[a-zA-z-_0-9]{35})/
  }, {
    "name": "Updated Databricks",
    "category": "API Key",
    "regex": /\\bdapi([a-z0-9]{30})\\b/
  }, {
    "name": "postman api",
    "category": "API KEY",
    "regex": /PMAK-[a-f0-9]{24}-[a-f0-9]{34}/
  }, {
    "name": "Square OAuth Secret",
    "category": "OAuth Token",
    "regex": /sq0csp-[a-z0-9-_\\\\]{43}(?![a-z0-9-_\\\\])/
  }, {
    "name": "EC2 SSH Private Key",
    "category": "Cryptographic Key",
    "regex": /[-]{5}BEGIN EC PRIVATE KEY[-]{5}([\\s\\S]*?)[-]{5}END EC PRIVATE KEY[-]{5}/
  }, {
    "name": "Airtable API Key",
    "category": "API Key",
    "regex": /(key[a-zA-z0-9]{14})/
  }, {
    "name": "Slack Access Token",
    "category": "Access Token",
    "regex": /xox[baprs]-([0-9a-z]{10,48})[-0-9a-z]+\\b/
  }, {
    "name": "Clojars Deploy Token",
    "category": "API Key",
    "regex": /CLOJARS_[a-f0-9]{60}(?![a-z0-9_])/
  }, {
    "name": "Firebase Cloud Messaging API Key",
    "category": "API Key",
    "regex": /AAAA[A-Za-z0-9_-]{7}:[A-Za-z0-9_-]{140}/
  }, {
    "name": "Akamai API Key",
    "category": "API Key",
    "regex": /akab-[a-z0-9]{16}-[a-z0-9]{16}\\b/
  }, {
    "name": "Sendinblue Key",
    "category": "API Key",
    "regex": /xkeysib-([a-z0-9]{64})-([a-z0-9]{16})(?![a-z0-9-])/
  }, {
    "name": "RSA Private Key",
    "category": "Cryptographic Key",
    "regex": /[-]{5}BEGIN RSA PRIVATE KEY[-]{5}([\\s\\S]*?)[-]{5}END RSA PRIVATE KEY[-]{5}/
  }, {
    "name": "GitHub Access Token",
    "category": "API Key",
    "regex": /(ghp_[a-zA-Z0-9]{36})/
  }, {
    "name": "DSA Private Key",
    "category": "Cryptographic Key",
    "regex": /[-]{5}BEGIN DSA PRIVATE KEY[-]{5}([\\s\\S]*?)[-]{5}END DSA PRIVATE KEY[-]{5}/
  }, {
    "name": "Authorization AWS Secret",
    "category": "Authorization Secret",
    "regex": /[0-9a-z+\\/]{15,1000}/
  }, {
    "name": "Shopify Key",
    "category": "Access Token",
    "regex": /shpss_[a-f0-9]{32}(?![a-z0-9-_])/
  }, {
    "name": "Amazon AWS Access Key ID",
    "category": "API Key",
    "regex": /\\bAKIA[0-9A-Z]{16}\\b/
  }, {
    "name": "Authorization Password",
    "category": "Authorization Secret",
    "regex": /^.{8,1000}$/
  }, {
    "name": "Databricks Authentication Token",
    "category": "Access Token",
    "regex": /dapi([a-z0-9]{32})\\b/
  }, {
    "name": "Testing Token",
    "category": "API Key",
    "regex": /\\bdapi([a-z0-9]{30})\\b/
  }, {
    "name": "Postman API Key",
    "category": "API Key",
    "regex": /PMAK-[a-f0-9]{24}-[a-f0-9]{34}/
  }, {
    "name": "Twitter Bearer Token",
    "category": "API Key",
    "regex": /\\b(?<!Bearer\\s)[A]{21}[0-9a-z-_%?]{80,110}(?![A-Za-z0-9\\/+=])/
  }, {
    "name": "Amazon AWS Access Key ID",
    "category": "API Key",
    "regex": /(AKIA[0-9A-Z]{16})/
  }, {
    "name": "Postman API Key",
    "category": "API Key",
    "regex": /(PMAK-[a-f0-9]{24}-[a-f0-9]{34})/
  }, {
    "name": "RazorPay Access Key ID",
    "category": "API Key",
    "regex": /\\brzp_live_[A-Z0-9]{14}\\b/
  }, {
    "name": "Authorization Secret",
    "category": "Authorization Secret",
    "regex": /^.{15,1000}$/
  }, {
    "name": "Bearer Token",
    "category": "Generic Secret",
    "regex": /bearer ([a-z]+[0-9]|[0-9]+[a-z])[a-z0-9/+_.-]{15,1000}(?![a-z0-9/+.-])/
  }, {
    "name": "Slack Webhook URL",
    "category": "Webhook URL",
    "regex": /https:\/\/hooks\.slack\.com\/services\/T[a-z0-9_]{8,10}\/B[a-z0-9_]{8,12}\/[a-z0-9_]{1,24}/
  }, {
    "name": "Microsoft Outlook Team Webhook URL",
    "category": "Webhook URL",
    "regex": /https:\/\/outlook\.office\.com\/webhook\/([a-f0-9]{8})-([a-f0-9]{4})-([a-f0-9]{4})-([a-f0-9]{4})-([a-f0-9]{12})@([a-f0-9]{8})-([a-f0-9]{4})-([a-f0-9]{4})-([a-f0-9]{4})-([a-f0-9]{12})(?![a-z0-9-_])/
  }, {
    "name": "Amazon MWS Token",
    "category": "Access Token",
    "regex": /amzn.mws.([0-9a-f]{8})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{12})(?![a-z0-9-])/
  }, {
    "name": "AWS Access Key",
    "category": "Authorization Secret",
    "regex": /A[S|K]IA[0-9a-z]{15,1000}\\b/
  }, {
    "name": "Typeform API Key",
    "category": "API Key",
    "regex": /tfp_[0-9a-z-_]{59}\\b/
  }, {
    "name": "Amazon AWS Access Key ID",
    "category": "API Key",
    "regex": /(AKIA[0-9A-Z]{16})/
  }, {
    "name": "PGP Private Key",
    "category": "Cryptographic Key",
    "regex": /[-]{5}BEGIN PGP PRIVATE KEY BLOCK[-]{5}([\\s\\S]*?)[-]{5}END PGP PRIVATE KEY BLOCK[-]{5}/
  }, {
    "name": "Akamai Authorization Token",
    "category": "Authorization Secret",
    "regex": /akaa[0-9a-z-]{15,1000}\\b/
  }, {
    "name": "OpenSSH Private Key",
    "category": "API Key",
    "regex": /[-]{5}BEGIN OPENSSH PRIVATE KEY[-]{5}([\\s\\S]*?)[-]{5}END OPENSSH PRIVATE KEY[-]{5}/
  }, {
    "name": "GitHub Personal Access Token",
    "category": "API Key",
    "regex": /\\bghp_[A-Z0-9]{36}\\b/
  }, {
    "name": "Google OAuth Token",
    "category": "Access Token",
    "regex": /[0-9]+-[0-9a-z_]{32}\\.apps\\.googleusercontent\\.com/
  }];

exports.handler = async (event, context) => {
    const randomIdx = Math.floor(Math.random() * 57);
    const randomRegex = customRegexes[randomIdx];

    return {
        statusCode: 200,
        body: JSON.stringify({
            type: randomRegex.name,
            category: randomRegex.category,
            regex: randomRegex.regex,
            value: randExp(randomRegex.regex)
        })
    };
}
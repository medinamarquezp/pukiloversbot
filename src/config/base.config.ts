module.exports = {
  "app_port": process.env.PORT || 8080,
  "http_token": process.env.HTTP_TOKEN,
  "terms": ["puppy", "kittie"],
  "producers": {
    "pexels": {
      "url": "https://api.pexels.com/v1",
      "key": process.env.PEXELS_API_KEY
    },
    "unsplash": {
      "url": "https://api.unsplash.com",
      "key": process.env.UNSPLASH_API_KEY
    },
    "giphy": {
      "url": "https://api.giphy.com/v1",
      "key": process.env.GIPHY_API_KEY
    }
  },
  "services": {
    "clarifai": {
      "tagsExcluded": ["people", "person", "man", "woman", "child", "adult"],
      "url": "https://api.clarifai.com/v2/models/aaa03c23b3724a16a56b629203edc62c/outputs",
      "key": process.env.CLARIFAI_API_KEY
    }
  },
  "publishers": {
    "twitter": {
      "consumer_key": process.env.TWITTER_CONSUMER_KEY,
      "consumer_secret": process.env.TWITTER_CONSUMER_SECRET,
      "access_token_key": process.env.TWITTER_ACCESS_TOKEN_KEY,
      "access_token_secret": process.env.TWITTER_ACCESS_TOKEN_SECRET
    }
  },
  "database": {
    "serviceAccount": {
        "type": "service_account",
        "project_id": process.env.FIREBASE_PROJECT_ID,
        "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
        "private_key": process.env.FIREBASE_PRIVATE_KEY,
        "client_email": process.env.FIREBASE_CLIENT_EMAIL,
        "client_id": process.env.FIREBASE_CLIENT_ID,
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": process.env.FIREBASE_CLIENT_CERT_URL
    }
  }
}
import * as Twitter from 'twitter'
import config from '../config/main'
import getImageData from '../services/image.service'

class TweetBot {
    private client:Twitter;

    constructor() {
        const { consumer_key, consumer_secret, access_token_key, access_token_secret } = config.publishers.twitter;
        this.client = new Twitter({
            consumer_key,
            consumer_secret,
            access_token_key,
            access_token_secret
        })
    }
    async tweetMedia(imageURL: string, content: string) : Promise<ITweetBotResponse> {
        const media = await getImageData(imageURL)
        let response: any;
        try {
            const postMedia = await this.client.post("media/upload", { media })
            const status = { status: content, media_ids: postMedia.media_id_string }
            const postTweet = await this.client.post("statuses/update", status)
            response = { id: postTweet.id, source: postTweet.source, text: postTweet.text }
        } catch (error) {
            throw new Error(error)
        }
        return response
    }
}

interface ITweetBotResponse {
    id: string,
    source: string,
    text: string
}

export default TweetBot
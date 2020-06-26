import * as Twitter from 'twitter'
import config from '../config/main'
import getImageData, { getImageSize, changeImageExtension } from '../services/image.service'

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
    private async tweetAnImage(imageURL: string, status: string) {
        let response: any;
        try {
            const media = await getImageData(imageURL)
            const postMedia = await this.client.post("media/upload", { media })
            const publishStatusUpdate = await this.client.post("statuses/update", { status, media_ids: postMedia.media_id_string })
            response = { id: publishStatusUpdate.id, source: publishStatusUpdate.source, text: publishStatusUpdate.text }
        } catch (error) {
            throw new Error(error)
        }
        return response
    }
    private async tweetAGif(imageURL:string, status: string) {
        let response: any;
        try {
            const media = await getImageData(imageURL)
            const media_type = "image/gif"
            const total_bytes = await getImageSize(imageURL)
            const mediaUpload = await this.client.post("media/upload", { command: "INIT", total_bytes, media_type })
            const media_id = mediaUpload.media_id_string
            await this.client.post("media/upload", { command: "APPEND", media_id, media, segment_index: 0 })
            await this.client.post("media/upload", { command: "FINALIZE", media_id })
            const publishStatusUpdate = await this.client.post("statuses/update", { status, media_ids: media_id})
            response = { id: publishStatusUpdate.id, source: publishStatusUpdate.source, text: publishStatusUpdate.text }
        } catch (error) {
            throw new Error(error)
        }
        return response
    }
    async tweetMedia(imageURL: string, status: string) : Promise<ITweetBotResponse> {
        if (imageURL.indexOf('.webp') > -1) {
            const gifImage = changeImageExtension(imageURL, 'webp', 'gif')
            return await this.tweetAGif(gifImage, status)
        }
        return await this.tweetAnImage(imageURL, status)
    }
}

interface ITweetBotResponse {
    id: string,
    source: string,
    text: string
}

export default TweetBot
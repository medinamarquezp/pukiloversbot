import TweetBot from '../../publishers/tweetbot.publisher'

describe.skip('TweetBot publisher tests', () => {
    test('It should publish an image on Twitter', async() => {
        const image = "https://i.giphy.com/media/3boPPdHk2ueo8/giphy.webp"
        const tweetbot = new TweetBot;
        const response = await tweetbot.tweetMedia(image, "Test tweet")
        expect(response.id).not.toBeUndefined()
        expect(response.source).toContain("twitter.com")
        expect(response.text).toContain("Test tweet")
    })
})
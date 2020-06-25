import TweetBot from '../../publishers/tweetbot.publisher'

describe.skip('TweetBot publisher tests', () => {
    test('It should publish an image on Twitter', async() => {
        const image = "https://images.unsplash.com/photo-1565726166189-e9814a05ffde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
        const tweetbot = new TweetBot;
        const response = await tweetbot.tweetMedia(image, "Test tweet")
        expect(response.id).not.toBeUndefined()
        expect(response.source).toContain("twitter.com")
        expect(response.text).toContain("Test tweet")
    })
})
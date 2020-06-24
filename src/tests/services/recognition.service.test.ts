import Recognition from '../../services/recognition.service'

const recognition = new Recognition();

describe('Recognition service test', () => {
    test("It should validate as falsy an image with a person", async() => {
        const imageWithAPerson = "https://images.pexels.com/photos/4639075/pexels-photo-4639075.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        const validateImage = await recognition.validateImageRecognition(imageWithAPerson)
        expect(validateImage).toBeFalsy()
    })
    test("It should validate as falsy an image with a person hand", async() => {
        const imageWithAPersonHand = "https://images.unsplash.com/photo-1576873601810-e91efcc1451f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
        const validateImage = await recognition.validateImageRecognition(imageWithAPersonHand)
        expect(validateImage).toBeFalsy()
    })
    test("It should validate as truthy an image without a person", async() => {
        const imageWithoutAPerson = "https://images.unsplash.com/photo-1525253086316-d0c936c814f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
        const validateImage = await recognition.validateImageRecognition(imageWithoutAPerson)
        expect(validateImage).toBeTruthy()
    })
    test("It should validate as falsy a gif with a baby", async() => {
        const gifWithABaby = "https://i.giphy.com/media/8J4w2i7kP7ceQ/giphy.webp"
        const validateImage = await recognition.validateImageRecognition(gifWithABaby)
        expect(validateImage).toBeFalsy()
    })
    test("It should validate as truthy a gif without a person", async() => {
        const gifWithoutAPerson = "https://i.giphy.com/media/4YFcrXwpjeMWk/giphy.webp"
        const validateImage = await recognition.validateImageRecognition(gifWithoutAPerson)
        expect(validateImage).toBeTruthy()
    })
})
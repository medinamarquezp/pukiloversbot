import config from '../../config/main'
import random from '../../services/random.service'

describe("Random service tests", () => {
    test("It should display a, b or c", () => {
        const randomNumbers = random(["a", "b", "c"])
        expect(randomNumbers).toMatch(/[a-c]/)
    })
    test("It should display a random term", () => {
        const { terms } = config
        const randomTerm = random(terms)
        const testedTerms = /puppy|kittie/
        expect(randomTerm).toMatch(testedTerms)
    })
    test("It should display a random producer", () => {
        const { producers } = config
        const producersList = Object.getOwnPropertyNames(producers)
        const randomProducer = random(producersList)
        const testedProducers = /pexels|unsplash|giphy/
        expect(randomProducer).toMatch(testedProducers)
    })
})
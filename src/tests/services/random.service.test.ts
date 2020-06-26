import config from '../../config/main'
import randomArrayElement, { randomNumberBetween } from '../../services/random.service'

describe("Random service tests", () => {
    test("It should display a, b or c", () => {
        const randomNumbers = randomArrayElement(["a", "b", "c"])
        expect(randomNumbers).toMatch(/[a-c]/)
    })
    test("It should display a random term", () => {
        const { terms } = config
        const randomTerm = randomArrayElement(terms)
        const testedTerms = /puppy|kittie/
        expect(randomTerm).toMatch(testedTerms)
    })
    test("It should display a random producer", () => {
        const { producers } = config
        const producersList = Object.getOwnPropertyNames(producers)
        const randomProducer = randomArrayElement(producersList)
        const testedProducers = /pexels|unsplash|giphy/
        expect(randomProducer).toMatch(testedProducers)
    })
    test("It should display a random number between two edges", () => {
        const from = 1
        const to = 20
        const randomNumber = randomNumberBetween(from, to)
        expect(randomNumber).toBeGreaterThanOrEqual(from)
        expect(randomNumber).toBeLessThanOrEqual(to)
    })
})
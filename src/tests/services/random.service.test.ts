import random, { randomTerm, randomProducer } from '../../services/random.service'

describe("Random service tests", () => {
    test("It should display a, b or c", () => {
        const randomNumbers = random(["a", "b", "c"])
        expect(randomNumbers).toMatch(/[a-c]/)
    })
    test("It should display a random term", () => {
        const terms = /puppy|kittie/
        expect(randomTerm).toMatch(terms)
    })
    test("It should display a random producer", () => {
        const producers = /pexels|unsplash|giphy/
        expect(randomProducer).toMatch(producers)
    })
})
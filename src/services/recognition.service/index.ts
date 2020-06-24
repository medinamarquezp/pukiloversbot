import config from "../../config/main"
import IRecognition from "./IRecognition"
import fetch, { Headers } from "../fetch.service"

class Recognition {
    private url: string
    private key: string
    private tagsExcluded: string

    constructor() {
        const { url, key, tagsExcluded } = config.services.clarifai
        this.url = url
        this.key = key
        this.tagsExcluded = tagsExcluded
    }
    private headers(): Headers {
        return { Authorization: `Key ${this.key}` };
    }
    private postBody(url: string) : object {
        return {
            "inputs": [
                {
                    "data": {
                        "image": {
                            "url": url
                        }
                    }
                }
            ]
        }
    }
    private async fetchRecognition(url: string): Promise<IRecognition | undefined> {
        return await fetch.post(
            this.url,
            this.postBody(url),
            this.headers()
        );
    }
    private concepts(recognitionData: IRecognition): string[] {
        const concepts = recognitionData?.outputs?.[0].data.concepts;
        const tags= [];
        if (concepts) {
            for (const concept of concepts) {
                tags.push(concept.name)
            }
        }
        return tags;
    } 
    async validateImageRecognition(url: string) : Promise<boolean> {
        const recognitionData = await this.fetchRecognition(url) as IRecognition
        const concepts = this.concepts(recognitionData)
        const imageContainsExludedConcepts = concepts.some(concept => this.tagsExcluded.includes(concept))
        return !imageContainsExludedConcepts
    }
}
export { Recognition as default }
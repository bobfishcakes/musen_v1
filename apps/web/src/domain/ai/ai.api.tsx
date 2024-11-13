import { HttpService } from '../../core/http'

/**
 * @provider AiApi
 * @description An AI library to query OpenAI
 * @function {(prompt: string) => Promise<string>} chat - Send the prompt to OpenAI and get back its answer
 * @function {(prompt: string) => Promise<string>} generateImage - Send the prompt to OpenAI to generate an Image and get back the URL of the image in the answer
 * @function {(urlFile: string) => Promise<string>} fromAudioToText - Send the url of an audio file to OpenAI to transcribe it into text and get back the text in the answer
 * @function {(text: string) => Promise<string>} fromTextToAudio - Send the text to OpenAI to convert it into an mp3 file and get back the url of the audio file
 * @usage `Api.Ai.query(prompt); Api.Ai.generateImage(prompt)`
 * @isImportOverriden false
 * @import import { Api } from '@web/domain'
 */
export class AiApi {
  static async chat(prompt: string): Promise<string> {
    try {
      const response = await HttpService.api.post<any>(`/v1/ai/chat`, {
        prompt,
      })
      console.log('AI API Response:', response) // Debug log

      if (!response.answer) {
        console.error('Missing answer in response:', response)
        return 'Unable to generate description at this time'
      }

      return response.answer
    } catch (error) {
      console.error('AI API Error:', error)
      return 'Unable to generate description at this time'
    }
  }

  static generateImage(prompt: string): Promise<string> {
    return HttpService.api
      .post<any>(`/v1/ai/image`, { prompt })
      .then(({ answer }) => answer)
  }

  static fromAudioToText(url: string): Promise<string> {
    return HttpService.api
      .post<any>(`/v1/ai/audio-to-text`, { url })
      .then(({ answer }) => answer)
  }

  static fromTextToAudio(text: string): Promise<string> {
    return HttpService.api
      .post<any>(`/v1/ai/text-to-audio`, { text })
      .then(({ url }) => url)
  }

  static getSportsEvents(): Promise<string> {
    const prompt = `List today's major sporting events in basketball, football, soccer, baseball, hockey, tennis, and other major sports.
      For each event, provide the following information in this exact format:
      EventName|StartTime|EndTime
      Where:
      - EventName is the name of the event
      - StartTime is in 24-hour format (HH:MM)
      - EndTime is the expected end time in 24-hour format (HH:MM)
      Separate each event with a newline character.
      Do not include any additional information or formatting.`
    return HttpService.api
      .post<any>(`/v1/ai/chat`, { prompt })
      .then(({ answer }) => answer)
  }
}

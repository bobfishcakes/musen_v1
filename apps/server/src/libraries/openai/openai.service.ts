import { Injectable } from '@nestjs/common'
import { ReadStream } from 'fs'
import { Openai } from './internal/openai'

@Injectable()
export class OpenaiService {
  constructor(private openai: Openai) {}

  async chat(prompt: string): Promise<string> {
    return this.openai.chat(prompt)
  }

  async generateImage(prompt: string): Promise<string> {
    return this.openai.generateImage(prompt)
  }

  async fromAudioToText(readStream: ReadStream): Promise<string> {
    return this.openai.fromAudioToText(readStream)
  }

  async fromTextToAudio(text: string): Promise<Buffer> {
    return this.openai.fromTextToAudio(text)
  }

  async getSportsEvents(): Promise<string> {
    const prompt = `List today's major sporting events in basketball, football, soccer, baseball, hockey, tennis, and other major sports.
    For each event, provide the following information in this exact format:
    EventName|StartTime|EndTime
    Where:
    - EventName is the name of the event
    - StartTime is in 24-hour format (HH:MM)
    - EndTime is the expected end time in 24-hour format (HH:MM)
    Separate each event with a newline character.
    Do not include any additional information or formatting.`
    return this.chat(prompt)
  }

  isActive(): boolean {
    return this.openai.isActive()
  }
}

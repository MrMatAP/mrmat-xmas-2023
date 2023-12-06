export class Person {
  id: string
  name: string
  greeting: string
  language: string
  userMessage: string
  hasPicture: boolean
  userPicture: string

  constructor(id: string, name: string, greeting: string, language: string, userMessage: string, hasPicture: boolean, userPicture: string) {
    this.id = id
    this.name = name
    this.greeting = greeting
    this.language = language
    this.userMessage = userMessage
    this.hasPicture = hasPicture
    this.userPicture = userPicture
  }
}

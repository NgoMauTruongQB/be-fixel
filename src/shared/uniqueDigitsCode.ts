export function generateSixDigitCode(): string {
    const yearLastTwoDigits = String(new Date().getFullYear() % 100).padStart(2, '0')
  
    const randomDigits = String(Math.floor(Math.random() * 900) + 100)
  
    const code = `0${yearLastTwoDigits}${randomDigits}`
  
    return code
}
export function convertToTimeZone(date: Date, timezoneOffset: string | number): Date {
    const utcTime = date.getTime()
    const localTime = utcTime + Number(timezoneOffset)
    return new Date(localTime)
}
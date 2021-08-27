export function formatDate(date: string): number {
    const split = date.split('/')
    const splitFormat = split[2] + "-" + split[1] + "-" + split[0]
    const dateFormat = new Date(splitFormat).getTime();
    return dateFormat

}
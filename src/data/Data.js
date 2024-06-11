export const date = () => {
    const currentDate = new Date();
    const Year = currentDate.getFullYear();
    const Month = currentDate.getMonth();
    const Day = currentDate.getDay();
    const Time = currentDate.getMinutes();

    const fullData = `${Year}/${Month}/${Day}:${Time}`

    return fullData
}




  function getNextFiveDates(dateTimeString) {
    const dateOnly = dateTimeString.split(" ")[0];
    const date = new Date(dateOnly);

    // Month names array (0 = January)
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const dates = [];
    for (let i = 1; i <= 5; i++) {
      const nextDate = new Date(date);
      nextDate.setDate(date.getDate() + i);

      const dd = String(nextDate.getDate()).padStart(2, '0');
      const monthName = monthNames[nextDate.getMonth()];
      dates.push(`${dd} ${monthName}`);
    }
    return dates;
   }
   export default getNextFiveDates;
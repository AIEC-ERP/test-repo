export const fetchCurrentDateTime = () => {
  const now = new Date();

  // Get the current time in Muscat timezone (Asia/Muscat)
  const muscatTime = now.toLocaleString('en-GB', {
    timeZone: 'Asia/Muscat',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  // Now split the muscatTime into date and time
  const [date, time] = muscatTime.split(', ');

  // Ensure we are returning the date part correctly for use in the API
  return { date: date, time: time };
  //Output
//   {
//   date: 'DD/MM/YYYY',
//   time: 'HH:MM:SS'
// }

};

export const convertTimeTo12Hour = (time24) => {
  if (!time24 || typeof time24 !== 'string') {
    return ''; 
  }

  let [hour, minute, second] = time24.split(':');
  hour = parseInt(hour, 10);

  if (isNaN(hour) || !minute || !second) {
    return ''; 
  }

  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12 || 12; 

  return `${String(hour).padStart(2, '0')}:${minute}:${second} ${ampm}`;
};


export const formatDateToMySQL = (date) => {
  
  const [day, month, year] = date.split('/'); // split the date in DD/MM/YYYY format
  return `${year}-${month}-${day}`;  // format as YYYY-MM-DD
}

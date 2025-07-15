export const formatTime = (timeString) => {
    const parts = timeString.split(':').map(Number);
  
    let totalSeconds = 0;
  
    if (parts.length === 3) {
      // Format: H:MM:SS
      const [hrs, mins, secs] = parts;
      totalSeconds = hrs * 3600 + mins * 60 + secs;
    } else if (parts.length === 2) {
      // Format: M:SS or 0:SS
      const [mins, secs] = parts;
      totalSeconds = mins * 60 + secs;
    } else {
      return 'Invalid time';
    }
  
    const totalMinutes = totalSeconds / 60;
  
    if (totalMinutes < 1) {
      return `${totalMinutes.toFixed(2)} minutes`;
    } else if (totalMinutes < 60) {
      return `${Math.round(totalMinutes)} minute${Math.round(totalMinutes) !== 1 ? 's' : ''}`;
    } else {
      const hours = totalMinutes / 60;
      return `${hours.toFixed(2)} hours`;
    }
  };
  
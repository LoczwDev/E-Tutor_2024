export const formatDuration = (seconds) => {
  if (!seconds) return "0m";

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  const formatted = [];

  if (hours > 0) {
    formatted.push(`${hours}h`);
  }
  if (minutes > 0) {
    formatted.push(`${minutes}m`);
  }
  if (remainingSeconds > 0 || formatted.length === 0) {
    formatted.push(`${remainingSeconds}s`);
  }

  return formatted.join(" ");
};

export const formatDurationModify = (seconds) => {
  if (seconds === null || seconds === undefined) return "00:00"; // Return '00:00' if duration is not provided

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  // Format numbers to always have two digits
  const formattedHours = hours > 0 ? String(hours).padStart(2, "0") : "00";
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  // Return in HH:MM:SS or MM:SS format
  return hours > 0
    ? `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
    : `${formattedMinutes}:${formattedSeconds}`;
};

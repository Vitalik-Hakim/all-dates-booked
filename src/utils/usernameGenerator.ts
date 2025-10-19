const normalUsernames = [
  "@starboy98",
  "@glitterfrog",
  "@m4trixqueen",
  "@coolguy2003",
  "@luna_dreamer",
  "@pixel_warrior",
  "@neon_ninja",
  "@sarah_smith",
  "@john_doe123",
  "@musiclover99"
];

const absurdUsernames = [
  "@chronos_eater",
  "@calendar_devourer",
  "@timelord420",
  "@date_destroyer",
  "@temporal_vacuum",
  "@infinity_hopper",
  "@multiverse_monopoly",
  "@quantum_booker",
  "@void_scheduler",
  "@entropy_enthusiast"
];

const messages = [
  "This date is already booked by user",
  "Sorry, this date was just grabbed by",
  "Oh no… that date's booked by",
  "This date is reserved for",
  "Already taken by",
  "We're all out of dates. Time itself is fully reserved by",
  "The fabric of spacetime at this date belongs to",
  "This particular moment in history is owned by"
];

export const generateUsername = (attemptCount: number): string => {
  if (attemptCount < 3) {
    return normalUsernames[Math.floor(Math.random() * normalUsernames.length)];
  } else {
    return absurdUsernames[Math.floor(Math.random() * absurdUsernames.length)];
  }
};

export const generateMessage = (attemptCount: number): string => {
  if (attemptCount < 5) {
    return messages[Math.min(attemptCount, 4)];
  } else {
    return messages[Math.floor(Math.random() * messages.length)];
  }
};

export const parseError = (error: any) => {
  if (typeof error === "string") {
    console.log("string");
    return error;
  }

  if ("reason" in error) {
    const message = error.reason.split(":")[1];
    return message ? message.trim() : error.reason;
  }

  if ("message" in error) {
    const message = error.message.split(":")[1];
    return message ? message.trim() : error.message;
  }
};

export const parseImage = (src: string) => {
  if (!src.includes("https://")) return `https://${src}`;

  return src;
};

export const daysLeft = (deadline: number) => {
  const difference = new Date(deadline).getTime() - Date.now();
  const remainingDays = difference / (1000 * 3600 * 24);

  // console.log({ difference, remainingDays });

  return remainingDays.toFixed(0);
};

export const calculateBarPercentage = (target: number, collected: number) => {
  const percentage = Math.round((collected * 100) / target);

  return percentage;
};

export const parseUrl = (title: string, id: number) =>
  `${title.toLowerCase().replaceAll(" ", "-")}-${id}`;

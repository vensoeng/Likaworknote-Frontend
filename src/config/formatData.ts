const getCurrentDate = () => {
  const now = new Date();

  const khmerMonths = [
    "មករា",
    "កុម្ភៈ",
    "មីនា",
    "មេសា",
    "ឧសភា",
    "មិថុនា",
    "កក្កដា",
    "សីហា",
    "កញ្ញា",
    "តុលា",
    "វិច្ឆិកា",
    "ធ្នូ",
  ];

  const khmerNumbers = [
    "០",
    "១",
    "២",
    "៣",
    "៤",
    "៥",
    "៦",
    "៧",
    "៨",
    "៩",
  ];

  const toKhmerNumber = (number: number) => {
    return String(number)
      .split("")
      .map((digit) => khmerNumbers[Number(digit)])
      .join("");
  };

  const day = toKhmerNumber(now.getDate());
  const month = khmerMonths[now.getMonth()];
  const year = toKhmerNumber(now.getFullYear());

  const englishDate = now.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return {
    khmer: `ថ្ងៃទី${day} ខែ${month} ឆ្នាំ${year}`,
    english: englishDate,
  };
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
};

export { getCurrentDate, formatDate };
// utils.ts
export const updateArray = <T>(array: T[], value: T): T[] => {
  const newArray = [...array];

  if (!newArray.includes(value)) {
    newArray.push(value);
  }

  return newArray;
};

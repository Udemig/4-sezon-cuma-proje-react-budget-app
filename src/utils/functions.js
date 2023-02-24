export const checkSpecialCharsAndNumbers = (str) => {
  var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~0-9]/;
  return format.test(str);
};

export const formatDateForDateInput = (date) => {
  var year = new Date(date).getFullYear();
  var month = new Date(date).getMonth() + 1;
  if (month < 10) month = `0${month}`;
  var date = new Date(date).getDate();
  if (date < 10) date = `0${date}`;

  return `${year}-${month}-${date}`;
};

export const upperFirstLetter = (str) => {
  let temp = "";
  temp += str[0].toUpperCase();
  for (let i = 1; i < str.length; i++) {
    temp += str[i].toLowerCase();
  }
  return temp;
};

//1 задание - Функция для проверки длины строки

const isStringLengthValid = function (string, length) {
  return string.length <= length;
};

// Строка короче 7 символов
isStringLengthValid('qwerty',7);
// Строка ровно 6 символов
isStringLengthValid('qwerty',6);
// Строка длиннее 5 символов
isStringLengthValid('qwerty',5);

//2 задание - Функция для проверки, является ли строка палиндромом

const isPalindrome = function (string) {
  const normalizedString = string.replaceAll(' ','').toLowerCase();
  let invertedString = '';
  for (let i = normalizedString.length - 1; i >= 0; i--) {
    invertedString += normalizedString[i];
  }
  return invertedString === normalizedString;
};

// Строка является палиндромом
isPalindrome('топот');
// Строка является палиндромом
isPalindrome('ДовОд');
// Строка не является палиндромом
isPalindrome('Кекс');
// Строка является палиндромом
isPalindrome('Лёша на полке клопа нашёл ');

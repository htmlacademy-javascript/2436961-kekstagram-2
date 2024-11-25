//1 задание - Функция для проверки длины строки

const checkString = function (string, length) {
  return string.length <= length;
};

// Строка короче 7 символов
checkString('qwerty',7);
// Строка ровно 6 символов
checkString('qwerty',6);
// Строка длиннее 5 символов
checkString('qwerty',5);

//2 задание - Функция для проверки, является ли строка палиндромом

const checkPalindrome = function (string) {
  const normalizedString = string.replaceAll(' ','').toLowerCase();
  let invertedString = '';
  for (let i = normalizedString.length - 1; i >= 0; i--) {
    invertedString += normalizedString[i];
  }
  if (invertedString === normalizedString) {
    return invertedString;
  } else {
    return false;
  }
};

// Строка является палиндромом
checkPalindrome('топот');
// Строка является палиндромом
checkPalindrome('ДовОд');
// Строка не является палиндромом
checkPalindrome('Кекс');
// Строка является палиндромом
checkPalindrome('Лёша на полке клопа нашёл ');

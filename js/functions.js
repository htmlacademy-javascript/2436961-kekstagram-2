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

function transformTimeInMinutes(time) {
  const shareTime = time.split(':').map(Number);
  const hours = shareTime[0];
  const minutes = shareTime[1];
  return hours * 60 + minutes;
}

function calculateWorkMeeting(startWork, endWork, startMeet, timeMeet) {
  const startWorkInMinutes = transformTimeInMinutes(startWork);
  const endWorkInMinutes = transformTimeInMinutes(endWork);
  const startMeetInMinutes = transformTimeInMinutes(startMeet);
  const endMeetInMinutes = startMeetInMinutes + timeMeet;

  return startMeetInMinutes >= startWorkInMinutes && endMeetInMinutes <= endWorkInMinutes;
}
calculateWorkMeeting(('08:00', '17:30', '14:00', 90));

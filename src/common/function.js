import * as dayjs from 'dayjs';
import 'dayjs/locale/vi';
import utc from 'dayjs/plugin/utc'; // Import plugin UTC của dayjs

// Sử dụng plugin UTC của dayjs
dayjs.extend(utc);
export function formatDDMMYYYYHHMM(date) {
   return dayjs(date).format('DD-MM-YYYY HH:mm');
}

export const adjustTimeToLocal = (serverTime) => {
   dayjs.locale('vi');
   // Chuyển thời gian từ server về định dạng dayjs
   const serverTimeUTC = dayjs(serverTime);

   // Lấy độ chênh lệch múi giờ của máy tính so với UTC
   const timezoneOffset = dayjs().utcOffset();

   // Cộng độ chênh lệch múi giờ vào thời gian từ server
   const adjustedTime = serverTimeUTC.add(timezoneOffset, 'minute');

   // Định dạng thời gian đã điều chỉnh
   const formattedDateTime = adjustedTime.format('MMMM D, YYYY h:mm A');

   return formattedDateTime;
};

export const formatMonthDay = (serverTime) => {
   dayjs.locale('vi');
   // Chuyển thời gian từ server về định dạng dayjs
   const serverTimeUTC = dayjs(serverTime);

   // Lấy độ chênh lệch múi giờ của máy tính so với UTC
   const timezoneOffset = dayjs().utcOffset();

   // Cộng độ chênh lệch múi giờ vào thời gian từ server
   const adjustedTime = serverTimeUTC.add(timezoneOffset, 'minute');

   // Định dạng thời gian đã điều chỉnh
   const formattedDateTime = `${adjustedTime.format('MMMM')}, ${adjustedTime
      .locale('vi')
      .format('D')}`;

   return formattedDateTime;
};

export const saveLocalStorage = (key, data) => {
   localStorage.setItem(key, JSON.stringify(data));
};

export const saveWritting = (key, data) => {
   localStorage.setItem(key, JSON.stringify(data));
};

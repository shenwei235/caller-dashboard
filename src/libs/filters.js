export default {   
	// 将时间戳转换成日期格式   
	formatDateTime: (timeStamp) => {     
	// console.log('timeStamp', timeStamp);     
		if (!timeStamp || typeof timeStamp == 'undefined') {       
			return '';     
		}     
		const time = new Date(timeStamp);     
		const year = time.getFullYear();     
		const month = time.getMonth() + 1 >= 10 ? time.getMonth() + 1 : '0' + (time.getMonth() + 1);     
		const date = time.getDate() >= 10 ? time.getDate() : '0' + time.getDate();     
		const hour = time.getHours() >= 10 ? time.getHours() : '0' + time.getHours();     
		const minute = time.getMinutes() >= 10 ? time.getMinutes() : '0' + time.getMinutes();     
		const second = time.getSeconds() >= 10 ? time.getSeconds() : '0' + time.getSeconds();     
		const timeString = `${year}-${month}-${date} ${hour}:${minute}:${second}`;     
		return timeString;   
	} 
};
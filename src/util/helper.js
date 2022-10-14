// // - printDate() : prints the current date
// // code for printDate() function
// function printDate() {
// 	const date = new Date();
// 	console.log(date);
// }
// printDate();



// // - printMonth() : prints the current month
// // code for printMonth() function
// function printMonth() {
// 	const date = new Date();
// 	console.log(date.getMonth());
// }
// printMonth();


// // - getBatchInfo() : prints batch name, week#, Day#, the topic being taught today is ….. For example - Radon, W3D3, the topic for today is Nodejs module system’
// // code for getBatchInfo() function
// function getBatchInfo() {
//     console.log("Radon, W3D3, the topic for today is Nodejs module system");
// }
// getBatchInfo();

const today = new Date() 
const day = today.getDate()       
const month = today.getMonth()   
const year = today.getFullYear()
console.log(day);
console.log(month);
console.log(year);
const getInfo={
    name:"Lithium",
    week:'W3D5',
    topic:'Todays Node js Topic -- How to create Module and Export it.',
}
function getBatchInfo(){
    console.log(`${getInfo.name} , ${getInfo.week} , ${getInfo.topic} `)
}
getBatchInfo()




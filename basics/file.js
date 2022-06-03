const fs= require("fs");

// const quote=" vanakam da mapla";

// fs.writeFile("./awesome.html", quote, (err)=>{
//     console.log("completed writing!!!");
// });

// const quote2= "Live more, worry less 😂😂"; 
// const numb= +process.argv[2];
// for(i=1;i<=numb;i++)
// {
//     fs.writeFile(`./backup/text-${i}.html`, quote2, (err)=>{
//         console.log("completed writing!!!");
//     });
// }

fs.readFile("./backup/cool.txt","utf8",(err,data)=>{
    if(err){
        console.log("👎🏻 something went wrong",err);
    }
    else{
        console.log(data);
    }
});
/**
 *
 * Stream 是一个抽象接口，Node 中有很多对象实现了这个接口。
 *  例如，对http 服务器发起请求的request 对象就是一个 Stream，还有stdout（标准输出）
 *
 * Node.js，Stream 有四种流类型:
 *  Readable - 可读操作
 *  Writable - 可写操作
 *  Duplex - 可读可写操作
 *  Transform - 操作被写入数据，然后读出结果
 *
 * 所有的 Stream 对象都是 EventEmitter 的实例。常用的事件有：
 *  data - 当有数据可读时触发
 *  end - 没有更多的数据可读时触发
 *  error - 在接收和写入过程中发生错误时触发
 *  finish - 所有数据已被写入到底层系统时触发
 *
 *
**/


var fs=require('fs');
var rdData='';

console.log("---- 可读流 ---->  ");
// 创建 可读流
var readerStream=fs.createReadStream('data.json');

// 设置编码为 utf8
readerStream.setEncoding('UTF8');

// 处理流事件 --> data, end, and error
readerStream.on('data',function(chunk){
  var chObj=JSON.parse(chunk);
  console.log("data -> chObj : ",chObj);
  rdData=rdData+chunk;
});

readerStream.on('end',function(){
  console.log("end -> rdData ");
  var chObj=JSON.parse(rdData);
  console.log(chObj);
  console.log("----------- 读取流 程序执行完毕 ---------- ");
});

readerStream.on('error',function(err){
  console.log("error -> err : ",err.stack);
})




console.log("---- 写入流 ---->  ");
var letter='01001001000111110001110001110010000110011100100101110001111011';
var wtData=''

for(var i=0;i<1000;i++){
  wtData=wtData+letter;
};

//  创建一个可以写入的流 写入到文件output.txt中
var writerStream=fs.createWriteStream('output.txt');

// 使用 utf8 编码写入数据
writerStream.write(wtData,'UTF8');

// 标记文件末尾
writerStream.end();

// 处理流事件 --> data , end , and error
writerStream.on("finish",function(){
  console.log("写入完成 ");
  console.log("----------- 写入流 程序执行完毕 ---------- ");
});

writerStream.on('error',function(err){
  console.log(err.stack);
});



/**
 *
 * 管道流
 *  道提供了一个输出流到输入流的机制
 *
**/

// 创建一个 可读流
var rdStream=fs.createReadStream('output.txt');

// 创建一个 可写流
var wrStream=fs.createWriteStream('outputCopy.txt');

// 管道读写操作
// 读取 input.txt 文件内容，并将内容写入到 outputCopy.txt 文件中
rdStream.pipe(wrStream);


/**
 *
 * 链式流
 *  链式是通过连接输出流到另外一个流并创建多个对个流操作链的机制
 *
 * 链式流一般用于管道操作
 *
 *
**/

var zlib=require('zlib');

// 压缩 input.txt 文件为 input.txt.gz
fs.createReadStream("input.txt")
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('input.txt.gz'))






























//

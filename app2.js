var express = require('express');
var app = express();

var cluster=require("cluster");//used to create child process
if(cluster.isMaster){
    //first we need to find how many cpu cycle we have

    /*
Cluster programming in nodejs:
each nodejs process runs on single thread 
and by default its has memory limit of 512mb of 32 bit
and 1gb for 64 bit system

problem:
both memory and processing power is still a bottleneck for various 
process for nodejs

solution:
the best solution nodejs provide for scalling up the
application is to spilt a single process into multiple process as 
workers
this can be achieved by using cluster module.
it allow to create child process.
Workers are created by fork method
*/
    var cpus=require("os").cpus().length;
    for(var i=0;i<cpus;i++){
        cluster.fork();
    }
    cluster.on('online',function(worker){
        console.log("online : "+worker.process.pid );
    })
    cluster.on("exit",function(worker,code,single){
        console.log("exited process: "+worker.process.pid);
        cluster.fork();
    })
}else{
    var router=express.Router();
    router.get('/',function(req,res){
        res.json({
            message:"Hello world"+process.pid,
        })
    })

    app.use('/api',router);
    app.listen(3003,function(){
        console.log("server start: ",3003);
    })
}

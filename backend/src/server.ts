import express from 'express'
import type {Request, Response} from 'express'


const app = express() 

app.get("/rr", (req : Request,res : Response)=>{
res.send("Working Properly")
})

app.listen(3004,()=>{
  console.log("SERver is listening on port 3004")
}
)
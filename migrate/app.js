const {sequelize,User,Post}=require('./models')
const express=require('express')
const app=express()

app.use(express.json())


app.post('/post',async(req,res)=>{
    const {name,email,role}=req.body
    try {
        const user=await User.create({name,email,role})
        return res.json(user)  
    } catch (error) {
        console.log(error)
    }
})

app.get('/getall',async(req,res)=>{
    const users=await User.findAll()
    return res.json(users)
})

//pass uuid along the localhost/getone/uuid
app.get('/getone/:uuid',async(req,res)=>{
    const uuid=req.params.uuid
    try {
        const users=await User.findOne({
            where:{uuid}
        })
        return res.json(users)
    } catch (error) {
        console.log(error)
    }
})

app.put('/user/:uuid',async(req,res)=>{
    const uuid=req.params.uuid
    const {name,email,role}=req.body
    try {
        const user=await User.findOne({where:{uuid}})
        user.name=name
        user.email=email
        user.role=role
        await user.save()
        return res.json(user)
    } catch (error) {
        console.log(error)
    }
})


app.delete('/users/:uuid', async (req, res) => {
    const uuid = req.params.uuid
    try {
      const user = await User.findOne({ where: { uuid } })
  
      await user.destroy()
  
      return res.json({ message: 'User deleted!' })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })

//foreign key linking
app.post('/post2',async(req,res)=>{
    const{userUuid,body}=req.body
    try {
        const user=await User.findOne({where:{uuid:userUuid}})
        const post=await Post.create({body,userId:user.id})
        return res.json(post)
    } catch (error) {
        console.log(error)
    }
})

app.get('/post2',async(req,res)=>{
    try {
        const post=await Post.findAll({include:'user'})
      
        return res.json(post)
    } catch (error) {
        console.log(error)
    }
})



// app.delete('/posts2/:uuid', async (req, res) => {
//     const uuid = req.params.uuid
//     try {
//       const user = await Post.findOne({ where: { uuid } })
  
//       await user.destroy()
  
//       return res.json({ message: 'User deleted!' })
//     } catch (err) {
//       console.log(err)
//       return res.status(500).json({ error: 'Something went wrong' })
//     }
//   })

app.listen(4001,async()=>{
    console.log("port running")
    await sequelize.authenticate()
    console.log("db connected")
})
    


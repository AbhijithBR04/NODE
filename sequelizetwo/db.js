const {Sequelize}=require('sequelize')
const sequelize=new Sequelize(
    'test',
    'root',
    '',{
        host:"localhost",
        dialect:"mysql",
        port:"3305"       
    }
);

const connection=async()=>{
    try {
        await sequelize.authenticate();
        console.log("connected to db")
    } catch (error) {
        console.log(error);
    }
};

module.exports={sequelize,connection}
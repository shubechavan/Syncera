const xlsx = require('xlsx');
const Income = require('../models/Income');
const User = require('../models/User');





exports.addIncome = async (req,res)=>{
    const userId = req.user.id;
   try{ const {icon,source,amount,date} = req.body;

    if(!icon || !source || !amount || !date){
        return res.status(400).json({message:'All fields are required'});
    }
    const newIncome = new Income({user:userId,icon,source,amount,date});
    await newIncome.save();
    res.status(200).json({newIncome});
   }catch(error){
    res.status(500).json({message:'Internal server error'});
   }
}

exports.getAllIncome = async (req,res)=>{
    const userId = req.user.id;
    try{
        const income = await Income.find({ user: userId }).sort({ date: -1 });

        res.status(200).json({income});
    }catch(error){
        res.status(500).json({message:'Internal server error'});
    }
}

exports.deleteIncome = async (req,res)=>{
    try{
        await Income.findByIdAndDelete(req.params.id);
        res.json({message:'Income deleted successfully'});
    }catch(error){
        res.status(500).json({message:'Internal server error'});
    }
}

exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({ user: userId }).sort({ date: -1 });

        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date.toISOString().split('T')[0], // Format date as YYYY-MM-DD
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);

        xlsx.utils.book_append_sheet(wb, ws, 'Income');

        const filePath = 'income_details.xlsx';
        xlsx.writeFile(wb, filePath);

        res.download(filePath, (err) => {
            if (err) {
                console.error('Error sending file:', err);
                res.status(500).json({ message: 'File download failed' });
            }
        });
    } catch (error) {
        console.error('Error generating Excel:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};






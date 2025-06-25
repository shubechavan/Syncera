const xlsx = require('xlsx');
const Expense = require('../models/Expense');
const User = require('../models/User');





exports.addExpense = async (req, res) => {
    const userId = req.user.id;
  
    try {
      const { icon, category, amount, description, date } = req.body;
  
      if (!icon || !category || !amount || !description || !date) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      const newExpense = new Expense({
        userId,
        icon,
        category,
        amount,
        description,
        date,
      });
  
      await newExpense.save();
      res.status(200).json({ newExpense });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
exports.getAllExpense = async (req,res)=>{
    const userId = req.user.id;
    try{
        const expense = await Expense.find({ userId }).sort({ date: -1 });

        res.status(200).json({expense});
    }catch(error){
        res.status(500).json({message:'Internal server error'});
    }
}

exports.deleteExpense = async (req,res)=>{
    try{
        await Expense.findByIdAndDelete(req.params.id);
        res.json({message:'Expense deleted successfully'});
    }catch(error){
        res.status(500).json({message:'Internal server error'});
    }
}

exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const expense = await Expense.find({ user: userId }).sort({ date: -1 });

        const data = expense.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date.toISOString().split('T')[0], // Format date as YYYY-MM-DD
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);

        xlsx.utils.book_append_sheet(wb, ws, 'Expense');

        const filePath = 'expense_details.xlsx';
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






const Income = require('../models/Income');
const Expense = require('../models/Expense');
const mongoose = require('mongoose');

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new mongoose.Types.ObjectId(userId);

    // Aggregated totals
    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    // Income - last 60 days
    const last60DaysIncomeTransactions = await Income.find({
      userId: userObjectId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const incomeLast60Days = last60DaysIncomeTransactions.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );

    // Expense - last 30 days
    const last30DaysExpenseTransactions = await Expense.find({
      userId: userObjectId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const expensesLast30Days = last30DaysExpenseTransactions.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );

    // Latest 5 transactions from Income + Expense
    const lastTransactions = [
      ...(await Income.find({ userId: userObjectId })
        .sort({ date: -1 })
        .limit(5)
        .lean()
        .then((txns) =>
          txns.map((txn) => ({
            ...txn,
            type: 'income',
          }))
        )),
      ...(await Expense.find({ userId: userObjectId })
        .sort({ date: -1 })
        .limit(5)
        .lean()
        .then((txns) =>
          txns.map((txn) => ({
            ...txn,
            type: 'expense',
          }))
        )),
    ].sort((a, b) => new Date(b.date) - new Date(a.date)); // sort latest first

    // 🎯 Final Response
    res.json({
      totalBalance:
        (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),

      totalIncome: totalIncome[0]?.total || 0,
      totalExpenses: totalExpense[0]?.total || 0,

      last30DaysExpenses: {
        total: expensesLast30Days,
        transactions: last30DaysExpenseTransactions,
      },

      last60DaysIncome: {
        total: incomeLast60Days,
        transactions: last60DaysIncomeTransactions,
      },

      recentTransactions: lastTransactions,
    });
  } catch (error) {
    console.error('[DASHBOARD ERROR]', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

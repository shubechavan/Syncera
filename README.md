
# Syncera

![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&pause=1000&color=FF69B4&width=435&lines=Syncera+-+Modern.+Professional.)

[![GitHub stars](https://img.shields.io/github/stars/shubechavan/Syncera?style=social)](https://github.com/shubechavan/Syncera/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/shubechavan/Syncera?style=social)](https://github.com/shubechavan/Syncera/network)
[![GitHub issues](https://img.shields.io/github/issues/shubechavan/Syncera)](https://github.com/shubechavan/Syncera/issues)
[![GitHub license](https://img.shields.io/github/license/shubechavan/Syncera)](https://github.com/shubechavan/Syncera/blob/main/LICENSE)

## 🎯 Project Overview

**Syncera** is a modern finance tracker with a focus on performance, clarity, and scalability. Whether you're handling personal budgeting or integrating into a broader SaaS ecosystem — Syncera is the professional-grade foundation you need.

### 🔑 Key Benefits

- 📊 Track income and expenses with real-time analytics.
- 🚀 Optimized backend performance using MongoDB aggregations.
- 🧠 Smart insights: latest transactions, 30/60-day summaries.
- 📱 Built with a responsive, mobile-first frontend (React).
- 🔐 JWT-authenticated API routes.

## 📦 Features

- 🪙 Dashboard Summary (Total Income, Expenses, and Balance)
- ⏳ 30/60-day analytics snapshots
- 🔄 Unified recent transaction history
- 🧩 Modular architecture for scalability
- ⚡ REST API for frontend/backend integration

## ⚙️ Tech Stack

| Layer         | Technology                     |
|--------------|---------------------------------|
| Frontend     | React, Tailwind CSS             |
| Backend      | Node.js, Express.js             |
| Database     | MongoDB + Mongoose              |
| Auth         | JWT                             |
| Other Tools  | Redux, Axios, dotenv            |

## 🚀 Quick Start

### Prerequisites

- Node.js >= 14.x
- npm >= 6.x
- MongoDB Atlas / Local MongoDB

### Installation

```bash
git clone https://github.com/shubechavan/Syncera.git
cd Syncera
npm install
````

### Configuration

Create a `.env` file at the root:

```env
PORT=5000
MONGO_URI=your-mongodb-url
JWT_SECRET=your-super-secret-key
```

### Start Server

```bash
npm run dev
```

## 📊 Dashboard Endpoint

> `GET /api/dashboard`

### Response JSON:

```json
{
  "totalBalance": 4500,
  "totalIncome": 8000,
  "totalExpenses": 3500,
  "last30DaysExpenses": {
    "total": 1200,
    "transactions": [...]
  },
  "last60DaysIncome": {
    "total": 5000,
    "transactions": [...]
  },
  "recentTransactions": [
    {
      "type": "income",
      "amount": 1000,
      "description": "Freelance",
      "date": "2025-06-24T12:00:00.000Z"
    },
    ...
  ]
}
```

> ✅ Handles null dates with default fallbacks
> ✅ Sorted by `date` descending

## 🧪 Testing

```bash
npm test
```

## 🧩 Sample Income/Expense Document

```json
{
  "icon": "",
  "category": "Food",
  "amount": 50,
  "description": "Lunch",
  "date": "2025-06-20T00:00:00Z"
}
```

> ⚠️ `date` field is required for sorting in dashboard. Default it to `new Date()` if empty on frontend.

---

## 👨‍💻 Contributing

1. Fork the repo
2. Create your feature branch: `git checkout -b feature/NewFeature`
3. Commit your changes: `git commit -m "Add new feature"`
4. Push to the branch: `git push origin feature/NewFeature`
5. Open a Pull Request

## 🔐 License

This project is licensed under the MIT License — see the [LICENSE](./LICENSE) file for details.

## 🤝 Acknowledgments

* Designed & Maintained by [Shube Chavan](https://github.com/shubechavan)
* Shoutout to the open-source community for tools and libraries.

---

> “Simplicity is the soul of efficiency.” – Austin Freeman
> Keep coding, keep building. Syncera is just getting started. 💡



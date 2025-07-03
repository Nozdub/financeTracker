# 💰 Finance Tracker

This is a Django-based personal finance tracker that allows users to:
- Track income and expenses
- Set recurring transactions (e.g. monthly rent, salary)
- View recent transaction history
- Automatically calculate running balances
- Use a clean and responsive user interface

To come:
- Monthly budget planner featuring:
     - Income
     - Different expenditures: Obligatories and optionals.
     - Advice
     - Rollover suggestions
 

## 🚀 Features

- Register and login/logout securely
- Add expenses or income manually
- Automatic handling of recurring transactions
- View running balance and historical transactions
- Upcoming recurring payments preview
- Django test suite with pytest and GitHub Actions CI

## 🛠️ Technologies Used

- Python 3.12
- Django 5.2
- SQLite (default, can be changed)
- HTML/CSS (Django templates)
- Git + GitHub
- GitHub Actions for CI

## 🧪 Running Tests

```bash
pytest
```

## 🧑‍💻 Developer Setup

1. Clone the repo
2. Install dependencies with `pip install -r requirements.txt`
3. Run migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```
4. Start the server:
   ```bash
   python manage.py runserver
   ```

## 📝 Future Features

For a detailed roadmap of planned improvements, see [FUTURE_PLANS.md](FUTURE_PLANS.md).


---

Built as a learning project to grow as a full-stack developer.

Finance Tracker
===============

A full-stack personal finance management application built with Django and React. This platform allows users to track income and expenses, visualize financial trends, and interact with tools for budget planning and investment monitoring.

> **Note:** This is a work-in-progress project actively being developed and improved.

* * * * *

Features
--------

### Core Functionality

-   User registration and secure login/logout

-   Manual addition of income or expense transactions

-   Support for recurring transactions with future scheduling

-   Running balance auto-calculation

-   Fully searchable transaction history

### Dashboard

-   Overview page with financial summary and charts

-   Pie chart for category breakdown of expenses

-   Line graph showing income vs. expenses over time

-   Radial progress to show remaining monthly budget

### Budget Planner

-   Interactive planner styled like a modern Excel sheet

-   Income and expenses divided into necessary, optional, and savings categories

-   Pie chart and bar chart to compare planned vs. actual usage

-   Bill calendar and debt snowball tracker (upcoming)

### Investments

-   Add stocks manually with ticker, price, and quantity

-   Live value updates via API (to be integrated)

-   Line graph showing recent stock performance

-   Gain/loss calculations per stock

### Transactions Page

-   Merged page to view all past transactions and add new ones

-   Modal-based glassmorphic transaction form

-   Drop down menu with options to add transactions, modify transactions and manage categories. 

-   Inline balance calculation

-   Future-dated transactions tracked but excluded from balance until due

* * * * *

Technologies Used
-----------------

**Frontend:**

-   React (with JSX and hooks)

-   Material UI (MUI)

-   Custom CSS with Glassmorphism design

-   @visx for interactive chart rendering

**Backend:**

-   Python 3.12

-   Django 5.2

-   Django REST Framework

-   SQLite (configurable)

**DevOps:**

-   Git + GitHub

-   GitHub Actions for CI

-   pytest for backend test coverage

* * * * *

Developer Setup
---------------

### Backend

1.  Clone the repository

2.  Install dependencies:

    ```
    pip install -r requirements.txt
    ```

3.  Run migrations:

    ```
    python manage.py makemigrations
    python manage.py migrate
    ```

4.  Start development server:

    ```
    python manage.py runserver
    ```

### Frontend

1.  Navigate to frontend directory:

    ```
    cd frontend
    ```

2.  Install dependencies:

    ```
    npm install
    ```

3.  Start the React dev server:

    ```
    npm run dev
    ```

* * * * *

Running Tests
-------------

### Backend

```
pytest
```

* * * * *

Screenshots
-----------
A few screenshots of the current React UI, things are still very much a WiP and things will change as I hook them up to the Django backend over the coming weeks. 
![Overview Page](https://github.com/Nozdub/financeTracker/blob/main/financeTrackerOverview.png?raw=true)
![Transactions Page](https://github.com/Nozdub/financeTracker/blob/main/financeTrackerTransactions.png?raw=true)
![BudgetPlanner Page](https://github.com/Nozdub/financeTracker/blob/main/financeTrackerBudgetPlanner.png?raw=true)
![Investments Page](https://github.com/Nozdub/financeTracker/blob/main/financeTrackerInvestments.png?raw=true)


* * * * *

Future Roadmap
--------------

-   Full integration with a free public stock API

-   Monthly financial reports

-   Bill and calendar reminders

-   Localization and multi-language support

-   Export to PDF or Excel

* * * * *

Current issues
-------------
- Refreshing transaction list as transaction is edited or deleted. Modal updates, but page stays the same until manually refreshed. 
* * * * *

License
-------

This project is built for learning and portfolio purposes and is not intended for commercial use.

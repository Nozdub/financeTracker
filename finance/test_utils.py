from finance.utils import calculate_running_total


def test_calculate_running_total_basic():
    transactions = [
        {"amount": 100},
        {"amount": -30},
        {"amount": 50},
    ]

    result = calculate_running_total(transactions)

    assert result[0]["running_total"] == 100
    assert result[1]["running_total"] == 70
    assert result[2]["running_total"] == 120


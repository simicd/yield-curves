import datetime
from yield_curves.extraction.download_yield_curve import generate_eiopa_rfr_url


def test_generate_eiopa_rfr_url():
    """Check if URL is generated correctly
    """

    # rate data
    date = datetime.date(2020, 6, 30)

    # Expected Output
    expected_url = "https://www.eiopa.europa.eu/sites/default/files/risk_free_interest_rate/eiopa_rfr_20200630.zip"

    # Actual output
    actual_url = generate_eiopa_rfr_url(date)

    # Assert
    assert actual_url == expected_url

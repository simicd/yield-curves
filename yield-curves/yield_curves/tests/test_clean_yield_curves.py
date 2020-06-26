import pandas as pd
from yield_curves.extraction.clean_yield_curves import clean_eiopa_rfr, unpivot_maturities

def test_clean_eiopa_rfr():
    """Test clean eiopa curves
    """

    # rate data
    rate_input = pd.DataFrame({
        'Unnamed: 0': {0: None, 1: None, 2: None, 3: None, 4: None, 5: None, 6: None, 7: None, 8: None, 9: None, 10: None, 11: None, 12: None, 13: None, 14: None},
        'Main menu': {0: None, 1: 'Coupon_freq', 2: 'LLP', 3: 'Convergence', 4: 'UFR', 5: 'alpha', 6: 'CRA', 7: 'VA', 8: 1, 9: 2, 10: 3, 11: 4, 12: 5, 13: 6, 14: 7},
        'Euro': {0: 'EUR_28_2_2017_SWP_LLP_20_EXT_40_UFR_4.2', 1: 1, 2: 20, 3: 40, 4: 4.2, 5: 0.129007, 6: 10, 7: 0, 8: -0.00316, 9: -0.00269, 10: -0.00203, 11: -0.00122, 12: -0.00022, 13: 0.00092, 14: 0.00215},
        'Austria': {0: 'AT_28_2_2017_SWP_LLP_20_EXT_40_UFR_4.2', 1: 1, 2: 20, 3: 40, 4: 4.2, 5: 0.129007, 6: 10, 7: 0, 8: -0.00316, 9: -0.00269, 10: -0.00203, 11: -0.00122, 12: -0.00022, 13: 0.00092, 14: 0.00215},
        'Belgium': {0: 'BE_28_2_2017_SWP_LLP_20_EXT_40_UFR_4.2', 1: 1, 2: 20, 3: 40, 4: 4.2, 5: 0.129007, 6: 10, 7: 0, 8: -0.00316, 9: -0.00269, 10: -0.00203, 11: -0.00122, 12: -0.00022, 13: 0.00092, 14: 0.00215}
        })


    # Expected Output
    expected_data = pd.DataFrame({
        'EIOPA_RFR_ID': {'Euro': 'EUR_28_2_2017_SWP_LLP_20_EXT_40_UFR_4.2', 'Austria': 'AT_28_2_2017_SWP_LLP_20_EXT_40_UFR_4.2', 'Belgium': 'BE_28_2_2017_SWP_LLP_20_EXT_40_UFR_4.2'},
        'Coupon_freq': {'Euro': 1, 'Austria': 1, 'Belgium': 1},
        'LLP': {'Euro': 20, 'Austria': 20, 'Belgium': 20},
        'Convergence': {'Euro': 40, 'Austria': 40, 'Belgium': 40},
        'UFR': {'Euro': 4.2, 'Austria': 4.2, 'Belgium': 4.2},
        'alpha': {'Euro': 0.129007, 'Austria': 0.129007, 'Belgium': 0.129007},
        'CRA': {'Euro': 10, 'Austria': 10, 'Belgium': 10},
        'VA': {'Euro': 0, 'Austria': 0, 'Belgium': 0},
        1: {'Euro': -0.00316, 'Austria': -0.00316, 'Belgium': -0.00316},
        2: {'Euro': -0.00269, 'Austria': -0.00269, 'Belgium': -0.00269},
        3: {'Euro': -0.00203, 'Austria': -0.00203, 'Belgium': -0.00203},
        4: {'Euro': -0.00122, 'Austria': -0.00122, 'Belgium': -0.00122},
        5: {'Euro': -0.00022, 'Austria': -0.00022, 'Belgium': -0.00022},
        6: {'Euro': 0.00092, 'Austria': 0.00092, 'Belgium': 0.00092},
        7: {'Euro': 0.00215, 'Austria': 0.00215, 'Belgium': 0.00215},
        'Date': {'Euro': '2019-12-31', 'Austria': '2019-12-31', 'Belgium': '2019-12-31'},
    })

    # Actual output
    actual_data = clean_eiopa_rfr(df=rate_input, date="2019-12-31").drop(["rate_id"], axis=1)

    # Assert
    pd.testing.assert_frame_equal(actual_data, expected_data, check_like=True)

def test_unpivot_maturities():
    """Test clean eiopa curves
    """

    # rate data
    rate_input = pd.DataFrame({
    'Currency': ['USD']*4 + ['AUD']*2,
    'Rate': [0.0254, 0.0325, 0.0423, 0.0456, 0.1234, 0.3434],
    'Discount_Factor_Rate': [0.9937489247, 0.9841356626, 0.969405427, 0.9563886764, 0.9713290892, 0.8627745543],
    'Maturity': [0.25, 0.5, 0.75, 1, 0.25, 0.5],
    'Date': [pd.to_datetime("2019-12-31")]*6})


    # # Expected Output
    # expected_data = cf_input.copy()
    # expected_data["amount"] = [228.562253, 295.240699, 484.702713, 860.749809]

    # Actual output
    actual_data = unpivot_maturities(df=rate_input)

    # Assert
    pd.assert_frame_equal(actual_data, expected_data, check_like=True)

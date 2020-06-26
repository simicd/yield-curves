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
    rate_input.index.name = "Country"


    # Expected Output
    expected_data = pd.DataFrame({
        'Country': {0: 'Euro', 1: 'Euro', 2: 'Euro', 3: 'Euro', 4: 'Euro', 5: 'Euro', 6: 'Euro', 7: 'Austria', 8: 'Austria', 9: 'Austria', 10: 'Austria', 11: 'Austria', 12: 'Austria', 13: 'Austria', 14: 'Belgium', 15: 'Belgium', 16: 'Belgium', 17: 'Belgium', 18: 'Belgium', 19: 'Belgium', 20: 'Belgium'},
        'EIOPA_RFR_ID': {0: 'EUR_28_2_2017_SWP_LLP_20_EXT_40_UFR_4.2', 1: 'EUR_28_2_2017_SWP_LLP_20_EXT_40_UFR_4.2', 2: 'EUR_28_2_2017_SWP_LLP_20_EXT_40_UFR_4.2', 3: 'EUR_28_2_2017_SWP_LLP_20_EXT_40_UFR_4.2', 4: 'EUR_28_2_2017_SWP_LLP_20_EXT_40_UFR_4.2', 5: 'EUR_28_2_2017_SWP_LLP_20_EXT_40_UFR_4.2', 6: 'EUR_28_2_2017_SWP_LLP_20_EXT_40_UFR_4.2', 7: 'AT_28_2_2017_SWP_LLP_20_EXT_40_UFR_4.2', 8: 'AT_28_2_2017_SWP_LLP_20_EXT_40_UFR_4.2', 9: 'AT_28_2_2017_SWP_LLP_20_EXT_40_UFR_4.2', 10: 'AT_28_2_2017_SWP_LLP_20_EXT_40_UFR_4.2', 11: 'AT_28_2_2017_SWP_LLP_20_EXT_40_UFR_4.2', 12: 'AT_28_2_2017_SWP_LLP_20_EXT_40_UFR_4.2', 13: 'AT_28_2_2017_SWP_LLP_20_EXT_40_UFR_4.2', 14: 'BE_28_2_2017_SWP_LLP_20_EXT_40_UFR_4.2', 15: 'BE_28_2_2017_SWP_LLP_20_EXT_40_UFR_4.2', 16: 'BE_28_2_2017_SWP_LLP_20_EXT_40_UFR_4.2', 17: 'BE_28_2_2017_SWP_LLP_20_EXT_40_UFR_4.2', 18: 'BE_28_2_2017_SWP_LLP_20_EXT_40_UFR_4.2', 19: 'BE_28_2_2017_SWP_LLP_20_EXT_40_UFR_4.2', 20: 'BE_28_2_2017_SWP_LLP_20_EXT_40_UFR_4.2'},
        'Coupon_freq': {0: 1, 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1, 9: 1, 10: 1, 11: 1, 12: 1, 13: 1, 14: 1, 15: 1, 16: 1, 17: 1, 18: 1, 19: 1, 20: 1},
        'LLP': {0: 20, 1: 20, 2: 20, 3: 20, 4: 20, 5: 20, 6: 20, 7: 20, 8: 20, 9: 20, 10: 20, 11: 20, 12: 20, 13: 20, 14: 20, 15: 20, 16: 20, 17: 20, 18: 20, 19: 20, 20: 20},
        'Convergence': {0: 40, 1: 40, 2: 40, 3: 40, 4: 40, 5: 40, 6: 40, 7: 40, 8: 40, 9: 40, 10: 40, 11: 40, 12: 40, 13: 40, 14: 40, 15: 40, 16: 40, 17: 40, 18: 40, 19: 40, 20: 40},
        'UFR': {0: 4.2, 1: 4.2, 2: 4.2, 3: 4.2, 4: 4.2, 5: 4.2, 6: 4.2, 7: 4.2, 8: 4.2, 9: 4.2, 10: 4.2, 11: 4.2, 12: 4.2, 13: 4.2, 14: 4.2, 15: 4.2, 16: 4.2, 17: 4.2, 18: 4.2, 19: 4.2, 20: 4.2},
        'alpha': {0: 0.129007, 1: 0.129007, 2: 0.129007, 3: 0.129007, 4: 0.129007, 5: 0.129007, 6: 0.129007, 7: 0.129007, 8: 0.129007, 9: 0.129007, 10: 0.129007, 11: 0.129007, 12: 0.129007, 13: 0.129007, 14: 0.129007, 15: 0.129007, 16: 0.129007, 17: 0.129007, 18: 0.129007, 19: 0.129007, 20: 0.129007},
        'CRA': {0: 10, 1: 10, 2: 10, 3: 10, 4: 10, 5: 10, 6: 10, 7: 10, 8: 10, 9: 10, 10: 10, 11: 10, 12: 10, 13: 10, 14: 10, 15: 10, 16: 10, 17: 10, 18: 10, 19: 10, 20: 10},
        'VA': {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0, 14: 0, 15: 0, 16: 0, 17: 0, 18: 0, 19: 0, 20: 0},
        'Date': {0: '2019-12-31', 1: '2019-12-31', 2: '2019-12-31', 3: '2019-12-31', 4: '2019-12-31', 5: '2019-12-31', 6: '2019-12-31', 7: '2019-12-31', 8: '2019-12-31', 9: '2019-12-31', 10: '2019-12-31', 11: '2019-12-31', 12: '2019-12-31', 13: '2019-12-31', 14: '2019-12-31', 15: '2019-12-31', 16: '2019-12-31', 17: '2019-12-31', 18: '2019-12-31', 19: '2019-12-31', 20: '2019-12-31'},
         'Maturity': {0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7, 7: 1, 8: 2, 9: 3, 10: 4, 11: 5, 12: 6, 13: 7, 14: 1, 15: 2, 16: 3, 17: 4, 18: 5, 19: 6, 20: 7}, 'Rate': {0: -0.00316, 1: -0.00269, 2: -0.00203, 3: -0.00122, 4: -0.00022, 5: 0.00092, 6: 0.00215, 7: -0.00316, 8: -0.00269, 9: -0.00203, 10: -0.00122, 11: -0.00022, 12: 0.00092, 13: 0.00215, 14: -0.00316, 15: -0.00269, 16: -0.00203, 17: -0.00122, 18: -0.00022, 19: 0.00092, 20: 0.00215}
    })

    # Actual output
    actual_data = unpivot_maturities(df=rate_input)

    # Assert
    pd.testing.assert_frame_equal(actual_data, expected_data, check_like=True)

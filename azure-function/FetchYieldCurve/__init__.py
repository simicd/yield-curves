import logging
import pandas as pd

import azure.functions as func

input_data = pd.DataFrame({
    'Currency': ['USD'] * 2 + ['CAD'] * 2,
    'Date': [pd.to_datetime("2020-01-01")] * 2 + [pd.to_datetime("2020-01-31")] * 2,
    'Rate': [0.0250, 0.0350, 0.0245, 0.0256],
    'Maturity': [2.0, 3.0, 2.0, 3.0]
})

def main(req: func.HttpRequest) -> func.HttpResponse:
    """Function for API call

    Check the parameters given by the API call and filter the data based on them.
    The available parameters are:
    - date: The date of the curve requested
    - currency: The currency of the curved requested
    - maturity: The maturity of the curved requested

    Returns:
        Data requested by the API in json format

    """
    logging.info('Python HTTP trigger function processed a request.')

    date = get_param(req=req, param='date')
    currency = get_param(req=req, param='currency')
    maturity = get_param(req=req, param='maturity')

    if date or currency or maturity:

        output_data = pd.DataFrame([])

        # Date & Currency & Maturity
        if date and currency and maturity:
            try:
                clean_date = pd.to_datetime(date)
            except:
                return func.HttpResponse("Please pass a valid date through query string or in the request body",
                                         status_code=400)
            try:
                maturity = int(maturity)
            except:
                return func.HttpResponse("Please pass a valid number through query string or in the request body",
                                         status_code=400)
            output_data = input_data[(input_data["Date"] == clean_date) &
                                     (input_data["Currency"] == currency) &
                                     (input_data["Maturity"] == maturity)]
        # Date & Currency
        elif date and currency and not maturity:
            try:
                clean_date = pd.to_datetime(date)
            except:
                return func.HttpResponse("Please pass a valid date through query string or in the request body",
                                         status_code=400)
            output_data = input_data[(input_data["Date"] == clean_date) & (input_data["Currency"] == currency)]

        # Date
        elif date and not currency and not maturity:
            try:
                clean_date = pd.to_datetime(date)
            except:
                return func.HttpResponse("Please pass a valid date through query string or in the request body",
                                         status_code=400)
            output_data = input_data[(input_data["Date"] == clean_date)]

        # Date & Maturity
        elif date and not currency and maturity:
            try:
                clean_date = pd.to_datetime(date)
            except:
                return func.HttpResponse("Please pass a valid date through query string or in the request body",
                                         status_code=400)
            try:
                maturity = int(maturity)
            except:
                return func.HttpResponse("Please pass a valid number through query string or in the request body",
                                         status_code=400)
            output_data = input_data[(input_data["Date"] == clean_date) &
                                     (input_data["Maturity"] == maturity)]
        # Currency
        elif currency and not date and not maturity:
            output_data = input_data[(input_data["Currency"] == currency)]

        # Maturity
        elif maturity and not date and not currency:
            try:
                maturity = int(maturity)
            except:
                return func.HttpResponse("Please pass a valid number through query string or in the request body",
                                         status_code=400)
            output_data = input_data[(input_data["Maturity"] == maturity)]

        # Currency & Maturity
        elif currency and not date and maturity:
            try:
                maturity = int(maturity)
            except:
                return func.HttpResponse("Please pass a valid number through query string or in the request body",
                                         status_code=400)
            output_data = input_data[(input_data["Currency"] == currency) &
                                     (input_data["Maturity"] == maturity)]

        return func.HttpResponse(output_data.to_json(), mimetype="application/json")

    else:
        return func.HttpResponse("Please pass a date or currency or maturity on the query string or in the request body",
                                 status_code=400)


def get_param(req: func.HttpRequest, param: str):

    param_value = req.params.get(param)
    if not param_value:
        try:
            req_body = req.get_json()
        except ValueError:
            pass
        else:
            param_value = req_body.get(param)

    return param_value

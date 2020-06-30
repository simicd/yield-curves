import logging
import pandas as pd

import azure.functions as func


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    input_data = pd.DataFrame({
        'Currency': ['USD'] * 2 + ['CAD'] * 2,
        'Date': [pd.to_datetime("2020-01-01")] * 2 + [pd.to_datetime("2020-01-31")] * 2,
        'Rate': [0.0250, 0.0350, 0.0245, 0.0256],
        'Maturity': [2.0, 3.0, 2.0, 3.0 ]
    })

    date = get_param(req=req, param='date')
    currency = get_param(req=req, param='currency')

    if date or currency:
        output_data = pd.DataFrame([])
        if date and currency:
            try:
                clean_date = pd.to_datetime(date)
            except:
                return func.HttpResponse(
                    "Please pass a valid date through query string or in the request body",
                    status_code=400
                )
            output_data = input_data[(input_data["Date"] == clean_date) & (input_data["Currency"] == currency)]

        elif date and not currency:
            try:
                clean_date = pd.to_datetime(date)
            except:
                return func.HttpResponse(
                    "Please pass a valid date through query string or in the request body",
                    status_code=400
                )
            output_data = input_data[(input_data["Date"] == clean_date)]

        elif currency and not date:
            output_data = input_data[(input_data["Currency"] == currency)]

        return func.HttpResponse(output_data.to_json(), mimetype="application/json")

    else:
        return func.HttpResponse(
             "Please pass a date or currency on the query string or in the request body",
             status_code=400
        )

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


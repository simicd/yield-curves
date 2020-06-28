import logging
import pandas as pd

import azure.functions as func


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    date = req.params.get('date')
    if not date: # This can be a function itself for multiple params
        try:
            req_body = req.get_json()
        except ValueError:
            pass
        else:
            date = req_body.get('date')


    if date:
        try:
            clean_date = pd.to_datetime(date)
        except:
            return func.HttpResponse(
                "Please pass a valid date through query string or in the request body",
                status_code=400
            )

        input_data = pd.DataFrame({
            'Currency': ['USD'] * 2,
            'Date': [pd.to_datetime("2020-01-01")] * 2,
            'Rate': [0.0250, 0.0350],
            'Maturity': [2.0, 3.0]
        })

        output_data = input_data[input_data["Date"] == clean_date]

        return func.HttpResponse(output_data.to_json(), mimetype="application/json")
    else:
        return func.HttpResponse(
             "Please pass a date on the query string or in the request body",
             status_code=400
        )

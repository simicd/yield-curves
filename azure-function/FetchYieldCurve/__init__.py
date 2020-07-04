import logging
import pandas as pd

import azure.functions as func

input_data = pd.DataFrame({
    'Currency': ['USD'] * 2 + ['CAD'] * 2,
    'Date': [pd.to_datetime("2020-01-01")] * 2 + [pd.to_datetime("2020-01-31")] * 2,
    'Rate': [0.0250, 0.0350, 0.0245, 0.0256],
    'Maturity': [2.0, 3.0, 2.0, 3.0]
})

def main(req: func.HttpRequest, rates) -> func.HttpResponse:
    """Function for API call

    Check the parameters given by the API call and filter the data based on them.
    The available parameters are:
    - date: The date of the requested curve
    - filter: OData filter (e.g. filter=country_code eq 'US')

    Returns:
        Data requested by the API in json format

    """
    logging.info('Python HTTP trigger function processed the rates API request.')

    return func.HttpResponse(rates, mimetype="application/json")




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

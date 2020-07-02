import logging

import azure.functions as func


def main(req: func.HttpRequest, launches) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    return func.HttpResponse(launches, mimetype="application/json")

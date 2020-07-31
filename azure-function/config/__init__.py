import logging
import azure.functions as func
import json

from ..shared_code import parameter


def main(req: func.HttpRequest, config) -> func.HttpResponse:

    logging.info('Python HTTP trigger function processed a request.')

    config = json.loads(config)
    for key, value in config.items():
        # Try parsing (e.g. nested array or dict)
        try:
            config[key] = json.loads(value)
        except:
            # Skip if fails (e.g. strings, numbers)
            pass

    # Return configuration object
    return func.HttpResponse(json.dumps(config), mimetype="application/json")

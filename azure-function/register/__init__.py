import logging
import json

import azure.functions as func

def main(req: func.HttpRequest, registration: func.Out[str]) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    # Extract email from HTTP request
    try:
        # Read the request body and extract email from JSON
        req_body = req.get_json()
        email = req_body.get("email")
    except ValueError:
        # If operation fails return an error message with status code 400 (bad request)
        return func.HttpResponse(f"Operation failed - no email provided in body", status_code=400)

    # Create registration to be saved on Azure Table Storage
    data = {
        "Name": "Preview registration",
        "PartitionKey": "email",
        "RowKey": email
    }

    # Call the function binding - this step saves the data row to Table Storage
    registration.set(json.dumps(data))

    # Finally confirm creation of registration with status code 201 (resource created)
    return func.HttpResponse(f"Email registered with rowKey: {email}", status_code=201)


import logging
import os
import azure.functions as func
import json
import stripe


# This is your real test secret API key.
stripe.api_key = os.environ["STRIPE_API_KEY"]

def calculate_order_amount(item):
    """Depending on the item id calculate the amount

    Calculating the order's amount on the server to
    avoid manipulation of amount on the client side.
    """

    if item["id"] == "xl-tshirt":
        return 1400
    else:
        return 2000


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a post request for client secret for payment processing.')

    try:
        req_body = req.get_json()
    except ValueError:
        pass
    else:
        # The request should come with a service element in its body
        item = req_body['service']

    # Create PaymentIntent for the item that is given
    if item:
        intent = stripe.PaymentIntent.create(amount=calculate_order_amount(item), currency='usd')
        return func.HttpResponse(json.dumps({'clientSecret': intent['client_secret']}), mimetype="application/json")
    else:
        return func.HttpResponse("Please pass a valid service in the request body", status_code=400)

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
    logging.info('Python HTTP trigger function processed a request.')

    req_body = req.get_json()
    print(req_body)

    # try:
    #     req_body = req.get_json()
    # except ValueError:
    #     pass
    # else:
    #     # data = req_body.get('data')
    #     print(req_body)

    intent = stripe.PaymentIntent.create(amount=calculate_order_amount(req_body['service']), currency='usd')
    return func.HttpResponse(json.dumps({'clientSecret': intent['client_secret']}), mimetype="application/json")

    if req_body:
        intent = stripe.PaymentIntent.create(amount=calculate_order_amount(req_body['items']), currency='usd')
        return func.HttpResponse({'clientSecret': intent['client_secret']}, mimetype="application/json")
    else:
        return func.HttpResponse("Please pass a item on the query string or in the request body", status_code=400)

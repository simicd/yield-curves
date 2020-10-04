import logging
import json
import os
import requests

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
    data = {"Name": "Preview registration", "PartitionKey": "email", "RowKey": email}

    # Call the function binding - this step saves the data row to Table Storage
    registration.set(json.dumps(data))

    # Notify me via e-mail whenever a new user registers
    try:
        # send_mail(registrant=email,
        #           mail_from=os.environ["MAIL_FROM"],
        #           mail_to=os.environ["MAIL_TO"],
        #           token=os.environ["SENDGRID_TOKEN"])
        notify_on_github(owner=os.environ["GITHUB_REPO_OWNER"], repo=os.environ["GITHUB_REPO"], issue=os.environ["GITHUB_ISSUE"], token=os.environ["GITHUB_TOKEN"])
        logging.info("Successfully sent notification e-mail")
    except:
        logging.error(f"E-mail notification failed for new user {email}")

    # Finally confirm creation of registration with status code 201 (resource created)
    return func.HttpResponse(json.dumps({"message": f"Email registered: {email}"}),
                             status_code=201,
                             mimetype="application/json")


def notify_on_github(owner: str, repo: str, issue: str, token: str):
    """Notify via GitHub whenver a new user signs up. Note that the users e-mail address shouldn't be posted, only a message indicating that there is a new user."""

    body = {
	    "body": f"Notify @{owner}"
    }

    requests.post(f"https://api.github.com/repos/{owner}/{repo}/issues/{issue}/comments", data=json.dumps(body), headers={
                      "Authorization": f"Bearer {token}",
                      "content-type": "application/json"
                  })


def send_mail(registrant: str, mail_from: str, mail_to: str, token: str):
    """Send an e-mail via SendGrid to personal account whenver a new user signs up"""

    # Define POST request body for SendGrid API
    body = {
        "personalizations": [{
            "to": [{
                "email": mail_to
            }]
        }],
        "from": {
            "email": mail_from
        },
        "subject": "A new user registered (yield-curves.com)",
        "content": [{
            "type": "text/plain",
            "value": f"A new user signed up: {registrant}"
        }]
    }

    # Send request
    requests.post("https://api.sendgrid.com/v3/mail/send",
                  data=json.dumps(body),
                  headers={
                      "Authorization": f"Bearer {token}",
                      "content-type": "application/json"
                  })

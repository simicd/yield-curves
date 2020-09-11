import datetime
import logging

import azure.functions as func


def main(mytimer: func.TimerRequest) -> None:

    # Get current time
    utc_timestamp = datetime.datetime.utcnow().replace(
        tzinfo=datetime.timezone.utc).isoformat()

    # Log if timer is due
    if mytimer.past_due:
        logging.info('The timer is past due!')

    # Log when function ran
    logging.info('Python timer trigger function ran at %s', utc_timestamp)






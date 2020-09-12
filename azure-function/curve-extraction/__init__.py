import datetime
import logging
import os
import sys

# Add the parent path to list of indexed package folders.
# This is required for local development only since the flow package is outside of the azure-functions folder
# For the deployment the flow package is installed with pip hence the following line is not used (but can be left)
sys.path.append(os.path.abspath(os.path.join(os.path.dirname("../"), "yield-curves")))

import azure.functions as func
from yield_curves.extraction import download_file, clean_file, write_rates_df_to_table


def main(mytimer: func.TimerRequest) -> None:

    # Get current time
    utc_timestamp = datetime.datetime.utcnow().replace(tzinfo=datetime.timezone.utc)

    # Log if timer is due
    if mytimer.past_due:
        logging.info('The timer is past due!')

    # Log when function ran
    logging.info('Python timer trigger function ran at %s', utc_timestamp)


    # Determine download date (last day of previous month)
    download_date = datetime.date.today().replace(day=1)  - datetime.timedelta(days=1)

    # Download file, unzip it and retrieve the filename/file dictionary
    files = download_file(date=download_date)

    # Extract file if ending with "Term_Structures.xlsx"
    rfr_file = [virtual_file for file_name, virtual_file in files.items() if "Term_Structures.xlsx" in file_name][0]

    # Open Excel file and clean it
    cleaned_df = clean_file(date=str(download_date), file=rfr_file)

    logging.info(f"Completed extraction of data from {download_date}")

    # Write to table service
    write_rates_df_to_table(table_name="rates", table=cleaned_df, connection_string=os.environ["AzureWebJobsStorage"])

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

    # Log when function ran
    logging.info(f"Python timer trigger function run at {datetime.datetime.utcnow().replace(tzinfo=datetime.timezone.utc)}")

    # Determine download date (last day of previous month)
    download_date = datetime.date.today().replace(day=1)  - datetime.timedelta(days=1)

    try:
        # Download file, unzip it and retrieve the filename/file dictionary
        files = download_file(date=download_date)

        # Extract file if ending with "Term_Structures.xlsx"
        rfr_file = [virtual_file for file_name, virtual_file in files.items() if "Term_Structures.xlsx" in file_name][0]

        # Open Excel file and clean it
        cleaned_df = clean_file(date=str(download_date), file=rfr_file)

        logging.info(f"Completed extraction of data ({download_date})")
    except:
        cleaned_df = None
        logging.error(f"Download and exctracting data ({download_date}) failed")


    # If downloading & cleaning successful
    if cleaned_df is not None:
        # Write to table service
        try:
            write_rates_df_to_table(table_name="rates", table=cleaned_df, connection_string=os.environ["AzureWebJobsStorage"])
            logging.info(f"Successfully written data to Table Storage for {download_date}")
        except:
            logging.error(f"Writing data ({download_date}) to Table Storage failed")

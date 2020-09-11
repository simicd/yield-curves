import datetime
import logging
import glob
import re
import json
import os
import sys
from datetime import date
import tempfile

# Add the parent path to list of indexed package folders.
# This is required for local development only since the flow package is outside of the azure-functions folder
# For the deployment the flow package is installed with pip hence the following line is not used (but can be left)
sys.path.append(os.path.abspath(os.path.join(os.path.dirname("../"), "yield-curves")))

import azure.functions as func
from yield_curves.extraction import download_files, download_file, clean_files


def main(mytimer: func.TimerRequest) -> None:

    # Get current time
    utc_timestamp = datetime.datetime.utcnow().replace(
        tzinfo=datetime.timezone.utc).isoformat()

    # Log if timer is due
    if mytimer.past_due:
        logging.info('The timer is past due!')

    # Log when function ran
    logging.info('Python timer trigger function ran at %s', utc_timestamp)



    # Function provided by Azure that returns the location of the temporary folder
    # See also: https://docs.microsoft.com/en-us/azure/azure-functions/functions-reference-python
    tempFilePath = tempfile.gettempdir()

    # Target folder
    raw_data_path = os.path.join(tempFilePath, r'./raw')
    clean_data_path = os.path.join(tempFilePath, r'./clean')
    # Create folders if they don't exist
    os.makedirs(raw_data_path, exist_ok=True)
    os.makedirs(clean_data_path, exist_ok=True)

    download_file(date=date(2020, 8, 31), path=raw_data_path)

    # Extract all files in raw file folder ending with ...Term_Structures.xlsx
    eiopa_files = list(
        glob.iglob(os.path.join(raw_data_path, r'**/*Term_Structures.xlsx'),
                recursive=True))

    # Extract dates from the filepath matching the pattern NNNN-NN-NN and create dictionary with dates as key and path as value
    file_dict = {
        re.search("[0-9]{4}-[0-9]{2}-[0-9]{2}", filepath).group(): filepath
        for filepath in eiopa_files
    }

    # Clean all files listed in the dictionary
    cleaned_dfs = clean_files(file_dict)

    # logging.info(list(cleaned_dfs.values())[0].head().to_json(orient="split"))

    # Write to table service
    # write_rates_df_to_table(account_name=credentials["account_name"], account_key=credentials["account_key"], table_name="rates", table=df)








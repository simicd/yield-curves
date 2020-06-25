import os
import datetime
import requests
from zipfile import ZipFile
from io import BytesIO

from pandas import date_range
from pandas.tseries.offsets import MonthEnd


def generate_eiopa_rfr_url(date: datetime.date):
    base_url= r'https://www.eiopa.europa.eu/sites/default/files/risk_free_interest_rate'
    return f"{base_url}/eiopa_rfr_{str(date).replace('-', '')}.zip"


def store_file(file_object, filepath: str):
    """Store file at target location specified in filepath variable"""

    with open(filepath, 'wb') as file:
        file.write(file_object)


def unzip(file_object, filepath: str):
    """Unzip file and store content at target location specified in filepath variable"""

    # ZipFile class expects a file location, e.g. ZipFile("file.zip","r") or a virtual file (BytesIO)
    with ZipFile(file_object) as zip_file:
        zip_file.extractall(filepath)


def download_file(url: str):
    """Submit response to server and return response content if successful"""

    response = requests.get(url)
    if response.ok:
        return response.content
    else:
        return None


def download_files(start_date: datetime.date, end_date: datetime.date, years, path):

    # Use pandas functions to generate series of dates at month end between start and end date
    dates_series = date_range(start_date, end_date, freq='MS') + MonthEnd()
    # Convert to list of strings with format YYYY-MM-DD
    dates = dates_series.strftime("%Y-%m-%d").tolist()

    # Generate URLs for each date
    url_dict = {}
    for date in dates:
        url_dict[date] = generate_eiopa_rfr_url(date)

    # Iterate through URLs and download & unzip each of the files
    for date, url in url_dict.items():
        try:
            # Get zipped file content from web
            web_content = download_file(url)

            # Since we get the file directly from the web, it's passed into BytesIO and turned into a virtual file
            file_object = BytesIO(web_content)

            # Unzip it into current location with subfolder
            unzip(file_object, filepath=os.path.join(path, 'EIOPA-RFR', f'{date}'))
        except:
            print(f"Download of {date} not successful")
import os
import datetime
import requests
from zipfile import ZipFile
from io import BytesIO

from pandas import date_range
from pandas.tseries.offsets import MonthEnd


def generate_eiopa_rfr_url(date: datetime.date):
    """Create download URL

    Args:
        date: Yield curve date

    Returns:
        URL string
    """

    base_url= r'https://www.eiopa.europa.eu/sites/default/files/risk_free_interest_rate'
    return f"{base_url}/eiopa_rfr_{str(date).replace('-', '')}.zip"


def store_file(file_object: bytes, filepath: str):
    """Store file at target location specified in filepath variable

    Args:
        file_object: File as binary buffer
        filepath: Target storage location
    """

    with open(filepath, 'wb') as file:
        file.write(file_object)


def unzip(file_object: BytesIO, filepath: str):
    """Unzip file and store content at target location specified in filepath variable

    Args:
        file_object: File as BytesIO buffer
        filepath: Target extraction location
    """

    # ZipFile class expects a file location, e.g. ZipFile("file.zip","r") or a virtual file (BytesIO)
    with ZipFile(file_object) as zip_file:
        zip_file.extractall(filepath)


def fetch_content(url: str):
    """Fetch content from URL and return response content if successful

    Args:
        url: Link to file download
    """

    try:
        response = requests.get(url)
        if response.ok:
            return response.content
        else:
            return None
    except:
        print(f"Fetching {url} not successful")


def download_file(date: datetime.date, path: str):
    """Download, store and extract yield curve file for one date

    Args:
        date: Yield curve date
        path: Target storage location
    """

    # Construct download URL from date
    url = generate_eiopa_rfr_url(date)

    try:
        # Get zipped file content from web
        file_content = fetch_content(url)

        if file_content is None:
            print(f"No data fetched for {date}")
        else:
            # Since the file comes as bytes array from the web,
            # it's passed into BytesIO and turned into a virtual file
            # This there is no need to store the .zip - only the extracted content (next step)
            file_object = BytesIO(file_content)

            # Unzip it into current location with subfolder
            unzip(file_object, filepath=os.path.join(path, 'EIOPA-RFR', f'{date}'))
    except:
        print(f"Download of {date} not successful")


def download_files(start_date: datetime.date, end_date: datetime.date, path: str):
    """Download, store and extract yield curve files between two dates

    Args:
        date: Yield curve date
        path: Target storage location
    """

    # Use pandas functions to generate series of dates at month end between start and end date
    dates_series = date_range(start_date, end_date, freq='MS') + MonthEnd()
    # Convert to list of strings with format YYYY-MM-DD
    dates = dates_series.strftime("%Y-%m-%d").tolist()

    # Iterate through URLs and download & unzip each of the files
    for date in dates:
        download_file(date=date, path=path)

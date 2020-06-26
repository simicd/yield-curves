
import os
from yield_curves.extraction import download_files
from datetime import date

# Target folder
raw_data_path = r'./datasets/eiopa/raw'
# Create folders if they don't exist
os.makedirs(raw_data_path, exist_ok=True)

# Download risk-free yield curves between these two dates
download_files(start_date=date(2020, 1, 1), end_date=date(2020, 5, 1), path=raw_data_path)

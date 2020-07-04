
import os
from yield_curves.extraction import download_files, download_file, write_to_table, read_eiopa, clean_eiopa_rfr, unpivot_maturities
from datetime import date
import json

# Target folder
raw_data_path = r'./datasets/eiopa/raw'
# Create folders if they don't exist
os.makedirs(raw_data_path, exist_ok=True)

# Download risk-free yield curves between these two dates
# download_files(start_date=date(2020, 1, 1), end_date=date(2020, 5, 1), path=raw_data_path)
# download_file(date=date(2020, 6, 30), path=raw_data_path)

df = read_eiopa(filepath="datasets/eiopa/raw/EIOPA-RFR/2020-06-30/EIOPA_RFR_20200630_Term_Structures.xlsx", sheet_name="RFR_spot_no_VA")
df = clean_eiopa_rfr(df, date="2020-06-30")
table = unpivot_maturities(df)

# Extract the credentials from the local settings file
with open(r'yield-curves/local.settings.json') as json_file:
    credentials = json.load(json_file)

# Write to table service
write_to_table(account_name=credentials["account_name"], account_key=credentials["account_key"], table=table, table_name="rates")

print("Done")

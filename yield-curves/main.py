
import os
from yield_curves.extraction import download_files, download_file, write_to_table, read_eiopa, clean_eiopa_rfr, unpivot_maturities
from datetime import date
import glob
import re
import json

# Target folder
raw_data_path = r'./datasets/eiopa/raw'
clean_data_path = r'./datasets/eiopa/clean'
# Create folders if they don't exist
os.makedirs(raw_data_path, exist_ok=True)
os.makedirs(clean_data_path, exist_ok=True)

# # Download risk-free yield curves between these two dates
# download_files(start_date=date(2016, 1, 1), end_date=date(2020, 7, 1), path=raw_data_path)
# download_file(date=date(2020, 6, 30), path=raw_data_path)


# Extract all files in raw file folder ending with ...Term_Structures.xlsx
eiopa_files = list(
    glob.iglob(os.path.join(raw_data_path, r'**/*Term_Structures.xlsx'),
               recursive=True))

# Extract dates from the filepath matching the pattern NNNN-NN-NN and create dictionary with dates as key and path as value
file_dict = {
    re.search("[0-9]{4}-[0-9]{2}-[0-9]{2}", filepath).group(): filepath
    for filepath in eiopa_files
}


# Extract the credentials from the local settings file
with open(r'yield-curves/local.settings.json') as json_file:
    credentials = json.load(json_file)

for date, filepath in file_dict.items():
    try:
        df = read_eiopa(filepath, sheet_name="RFR_spot_no_VA")
        df = clean_eiopa_rfr(df, date)
        df = unpivot_maturities(df)
        # Store output as .csv
        df.to_csv(os.path.join(clean_data_path, f"eiopa-rfr-{date}.csv"), index=False, sep=',')
        # Write to table service
        # write_to_table(account_name=credentials["account_name"], account_key=credentials["account_key"], table=df, table_name="rates")
    except:
        print(f"Load and transform of {date} not successful")

print("Done")

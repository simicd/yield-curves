
import os
from yield_curves.extraction import download_files, download_file, write_rates_df_to_table, write_config_to_table, read_eiopa, clean_eiopa_rfr, unpivot_maturities, clean_file, clean_files
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

# Extract the credentials from the local settings file
with open(r'yield-curves/local.settings.json') as json_file:
    credentials = json.load(json_file)

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

# Clean all files listed in the dictionary
cleaned_dfs = clean_files(file_dict)

for date, df in cleaned_dfs.items():
    # Store output as .csv
    df.to_csv(os.path.join(clean_data_path, f"eiopa-rfr-{date}.csv"), index=False, sep=',')
    # Write to table service
    # write_rates_df_to_table(account_name=credentials["account_name"], account_key=credentials["account_key"], table_name="rates", table=df)

    # Write configuration to Azure Table Storage - list of distinct countries & country codes
    country_df = df[["country_code", "Country"]].drop_duplicates(subset=["country_code", "Country"]).rename({"Country": "country"}, axis=1)
    country_list = json.dumps(country_df.to_dict(orient="records"))
    write_config_to_table(account_name=credentials["account_name"], account_key=credentials["account_key"], table_name="rates",
                          record={"countries": country_list}, partition_key="config", row_key="countries")



print("Done")

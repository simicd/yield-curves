from azure.cosmosdb.table.tablebatch import TableBatch
from azure.cosmosdb.table.tableservice import TableService
from azure.cosmosdb.table.models import Entity
import json
import pandas as pd

with open(r'yield-curves/yield_curves/extraction/local.settings.json') as json_file:
    data = json.load(json_file)


table_service =  TableService(account_name=data["account_name"], account_key=data["table_key"])

table_service.create_table('rates')

table = pd.read_csv("/home/jovyan/repos/yield-curves/azure-function/FetchYieldCurve/yield-curves-file.csv")

table["PartitionKey"] = table["Date"]
table["Date"] = pd.to_datetime(table["Date"])
table["RowKey"] = table["Currency"] + "_" + table["Maturity"].astype(str)


for _, partition_df in table.groupby("PartitionKey"):
    batch = TableBatch()
    rates_list = json.loads(partition_df.to_json(date_format="iso", orient="records"))
    for rate in rates_list:
        batch.insert_or_replace_entity(rate)
    table_service.commit_batch('rates', batch)


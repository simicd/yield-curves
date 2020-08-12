
from azure.cosmosdb.table.tablebatch import TableBatch
from azure.cosmosdb.table.tableservice import TableService
import json
import pandas as pd
import numpy as np

from typing import Dict, List, Union


def __connect(account_name: str, account_key: str, table_name: str) -> TableService:
    """Helper function connecting to Azure Table service"""

    # Set up connection to table service
    table_service =  TableService(account_name=account_name, account_key=account_key)

    # Create a new table only if it does not exists
    table_service.create_table(table_name)

    return table_service


def write_rates_df_to_table(account_name: str, account_key: str, table_name: str, table: pd.DataFrame):

    # Set up connection to table service
    table_service =  __connect(account_name, account_key, table_name)

    # Specify PartitonKey and RowKey
    table["PartitionKey"] = table["Date"]
    table["Date"] = pd.to_datetime(table["Date"])
    table["RowKey"] = table["country_code"] + "_" + table["Maturity"].astype(str)

    # Iterate through each PartitionKey and insert the rows into batch and submit to table service
    for _, partition_df in table.groupby(["PartitionKey", np.arange(len(table)) // 100]):
        batch = TableBatch()
        rates_list = json.loads(partition_df.to_json(date_format="iso", orient="records"))
        for rate in rates_list:
            batch.insert_or_replace_entity(rate)
        table_service.commit_batch(table_name, batch)


def write_config_to_table(account_name: str, account_key: str, table_name: str, record: Dict[str, Union[str, List[str]]], partition_key: str, row_key: str):

    # Set up connection to table service
    table_service =  __connect(account_name, account_key, table_name)

    # Specify PartitonKey and RowKey
    record["PartitionKey"] = partition_key
    record["RowKey"] = row_key

    table_service.insert_or_replace_entity(table_name, record)

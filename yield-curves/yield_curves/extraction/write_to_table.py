from azure.cosmosdb.table.tableservice import TableService
from azure.cosmosdb.table.models import Entity

table_service = TableService(connection_string='DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=mykey;TableEndpoint=myendpoint;')
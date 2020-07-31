import pandas as pd
import uuid
from typing import Dict

def read_eiopa(filepath: str, sheet_name: str) -> pd.DataFrame:
    """Read EIOPA RFR Term Structures file.

    Args:
        file_path: The path where the file is stored.
        sheet_name: There are several types of rates, such as RFR_spot_no_VA.

    Returns:
        Pandas dataframe with chosen data.
    """

    # header=1 takes the dataframe header from the second row (zero-indexed)
    return pd.read_excel(filepath, sheet_name=sheet_name, header=1)


def clean_eiopa_rfr(df: pd.DataFrame, date: str) -> pd.DataFrame:
    """Clean the data so that it can be easily used

    Args:
        df: The pandas dataframe to be cleaned.
        date: The date for the data so that the rates can
            be differentiated once they are in one file.

    Returns:
        Cleaned pandas dataframe
    """

    # Remove empty column and rename the second column
    df_tr = df.drop(['Unnamed: 0'], axis=1).rename(columns={'Main menu': 'Attributes'})

    # Set the cell from first row, first column to 'ID' because the all values to the right are unique EIOPA identifiers
    df_tr.loc[0, 'Attributes'] = 'EIOPA_RFR_ID'

    # Unpivot so that countries are turned into rows (from columns)
    df_tr = df_tr.set_index('Attributes').T

    # Country column is the index - add the label
    df_tr.index.name = 'Country'

    # Add date column
    df_tr['Date'] = date

    # In recent years, VA is not filled in
    df_tr['VA'] = df_tr['VA'].fillna(0)

    # Generate rate_id with unique identifier generator - UUIDs have a very low probability of being generated twice (ever)
    df_tr['rate_id'] = df_tr.apply(lambda x: str(uuid.uuid4()), axis=1)

    # Extract the country code from the ID (Country attribute is a long name)
    df_tr["country_code"] = df_tr["EIOPA_RFR_ID"].str.split("_").str[0]

    # Convert numeric columns to float
    df_tr = df_tr.apply(pd.to_numeric, errors='ignore')

    return df_tr


def unpivot_maturities(df: pd.DataFrame) -> pd.DataFrame:
    """Unpivot the data to have rates in one column

    The original data is pivoted - each country's rate is displayed
    as columns. For example: Austria: 0.5%, France: 0.7%, Belgium: 0.8% ...

    Args:
        df: Pandas dataframe to be unpivoted

    Returns:
        Pandas dataframe with one column for rates and one for maturity
    """

    # Country is the column index which needs to be reset here
    df_temp = df.reset_index()

    # Get columns which are not numbers, i.e. not maturities
    non_numeric_cols = [col for col in df_temp.columns if type(col) != int]

    # Set index to all columns except maturity columns
    df_temp = df_temp.set_index(non_numeric_cols)

    # Define column index properly so that stacking works without further renaming
    df_temp.columns = pd.MultiIndex.from_product(
        [['Rate'], set(df_temp.columns) - set(non_numeric_cols)],
        names=[None, 'Maturity'])

    return df_temp.stack().reset_index()


def clean_file(date: str, filepath: str = None, dataframe: pd.DataFrame = None) -> pd.DataFrame:
    """Clean a RFR Excel file and return the cleaned dataframe

    Args:
        filepath: Pandas dataframe to be unpivoted
        date: Yield curve date

    Returns:
        Cleaned padnas dataframe
    """

    if filepath is None and dataframe is None:
        raise ValueError("Please specify either a filepath or pass a dataframe")

    if filepath is None:
        df = dataframe
    else:
        df = read_eiopa(filepath, sheet_name="RFR_spot_no_VA")

    df = clean_eiopa_rfr(df, date)
    df = unpivot_maturities(df)

    return df


def clean_files(file_dict: Dict[str, str]):
    """Clean all RFR Excel files and return the cleaned dataframes as dictionary

    Args:
        file_dict: Dictionary with dates as keys and filepaths as values

    Returns:
        Dictionary with dates as keys and cleaned dataframes as values
    """

    cleaned_dfs: Dict[str, pd.DataFrame] = {}

    for date, filepath in file_dict.items():
        try:
            # Load & clean dataframe and store into dictionary
            cleaned_dfs[date] = clean_file(date=date, filepath=filepath)
        except:
            print(f"Load and transform of {date} not successful")

    return cleaned_dfs
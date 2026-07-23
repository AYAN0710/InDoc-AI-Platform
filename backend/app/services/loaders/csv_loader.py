import pandas as pd

def extract_csv_text(file_path:str)->str:
    dataframe=pd.read_csv(file_path)
    rows=[]
    for _, row in dataframe.iterrows():
        row_text=[]
        for column in dataframe.columns:
            row_text.append(f"{column}:{row[column]}")
        rows.append("\n".join(row_text))
    return "\n\n".join(rows)
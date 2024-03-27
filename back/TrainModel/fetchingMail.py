import json
import sys
def getUserMail(inps):
    import pandas as pd
    import numpy as np
    datas=pd.read_csv('./TrainModel/Bengaluru_House_Data.csv')
    # datas=pd.read_csv('./Bengaluru_House_Data.csv')
    filtered_data = datas.loc[datas['email'] ==inps]
    # print(filtered_data)
    dict_result = filtered_data.to_dict(orient='records')
    print(dict_result)
    return dict_result

if __name__=="__main__":
    input_data = sys.stdin.read()
    inps=json.loads(input_data)
    result=getUserMail(inps)
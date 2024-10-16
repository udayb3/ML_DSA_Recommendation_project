import pandas as pd

# importing the data
df= []
for i in range(1,6):
	df.append( pd.read_json(f"test/gen_data_w10_{i}.json") )
	df[len(df)-1].reset_index(drop= True, inplace= True)
	
# 
final_df= pd.concat(df)
final_df.reset_index(inplace=True)
final_df.drop(['index'], inplace=True, axis=1)
final_df.to_json('gen_data.json')
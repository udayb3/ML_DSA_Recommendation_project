import pandas as pd

tot= pd.read_csv('link_data10.csv')
n= len(tot); t1= n//5
div_data= [tot[:t1], tot[t1:2*t1], tot[2*t1:3*t1], tot[3*t1: 4*t1], tot[4*t1:] ]
for i, df in enumerate(div_data):
  df.to_csv(f"splitted_data/link_collect{i+1}.csv")

from selenium import webdriver
from selenium.webdriver.common.by import By as by
import pandas as pd

opt= webdriver.FirefoxOptions()

opt.add_argument('--disable-extensions')
opt.add_argument('--no-sandbox') 
opt.add_argument('--disable-infobars')
opt.add_argument('--disable-dev-shm-usage')
opt.add_argument('--disable-browser-side-navigation')
opt.add_argument('--disable-gpu')
opt.add_argument('--blink-settings=imagesEnabled=false')
opt.add_argument('--headless')
opt.add_argument(
    'user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
)


for j in range(1, 6):

	df= pd.read_csv(f"test/link_collect{j}.csv")
	df.drop(['Unnamed: 0.1', 'Unnamed: 0'], axis=1, inplace=True)

	ini_df= df.to_dict()
	ini_df['text']={}

	for i in ini_df['link']:
		
		if(i%100==0):
			drv=webdriver.Firefox()
		drv.set_window_size(1400,850);	drv.set_window_position(0,0)
		
		drv.get(ini_df['link'][i])
		text= drv.find_element(by.ID, 'problem-body').text
		ini_df['text'][i]= text
		if((i+1)%100==0):
			print(f"{i} done")
			drv.quit()

	data= pd.DataFrame(ini_df)
	data.to_json(f"test/gen_data_w10_{j}.json")

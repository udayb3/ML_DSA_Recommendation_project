from selenium import webdriver
from selenium.webdriver.common.by import By as by
from time import sleep
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

df= pd.read_csv('./link_data.csv')
QUES= df.to_dict()

df_dict= {'id': [], 'name':[], 'text':[]}
tot_size= range(len(QUES['link']))

drv=webdriver.Firefox()
drv.set_window_size(1400,850);	drv.set_window_position(0,0)


for j in range(int(len(QUES['link'])/32)):
	
	drv=webdriver.Firefox()
	drv.set_window_size(1400,850);	drv.set_window_position(0,0)
	for l in range(32):
		i= j*32 + l
		WEBSITE= QUES['link'][i]
		drv.get(WEBSITE)
		sleep(1)
		my_data= {}
		try:
			ele = drv.find_element(by.XPATH, '//*[@id="problem-statement"]')
			my_data['id']= WEBSITE.split('/')[-1]
			my_data['name']= str(ele.text.encode("utf-8")).split('\n')[0]
			my_data['text']= ele.text.encode("utf-8")
			df_dict['id'].append(my_data['id']); df_dict['name'].append(my_data['name']); df_dict['text'].append(my_data['text'])
			print(f"question {i} done.")
		except:
			pass
	drv.quit()

df= pd.DataFrame(df_dict)
df.to_json('./gen_data.json')
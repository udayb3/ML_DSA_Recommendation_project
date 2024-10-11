from selenium import webdriver
from selenium.webdriver.common.by import By as by
from time import sleep
import pandas as pd

BASE='https://leetcode.com/problemset/?page='
num= range(1,68)
WEBSITE= BASE+str(num[3])

drv=webdriver.Firefox()
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

drv.set_window_size(1400,850);	drv.set_window_position(0,0)

QUES= {'link': [], 'diff':[]}
for i in num:

	# taking the pages
	WEBSITE= BASE+ str(i)
	print(WEBSITE)
	drv.get(WEBSITE)
	sleep(2)

	qtable = drv.find_element(by.XPATH, '/html/body/div[1]/div[1]/div[4]/div[2]/div[1]/div[4]/div[2]/div/div/div[2]')
	questions= qtable.find_elements( by.CSS_SELECTOR, "div[role=\"row\"]" )
	for ques in questions:

		check_parameter= ques.find_elements(by.CSS_SELECTOR,"div[role=\"cell\"] > svg > path[fill-rule=\"evenodd\"]") 
		if( len(check_parameter) == 0 ):
			try:
				eleme= ques.find_element(by.CSS_SELECTOR, "div[role=\"cell\"] > div >div > div > div > a")
				link= eleme.get_attribute('href')
				QUES['link'].append(link); QUES['diff'].append(ques.text.split('\n')[2])
			except:
				print("Some Error occured")
	if(i%10==0):
		print(f"page {i} done")

drv.quit()

df= pd.DataFrame(QUES)
df.to_csv('./link_data.csv', index=False)
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


df= pd.read_csv('link_data.csv')
QUES= df.to_dict()

df_dict= {'id': [], 'name':[], 'text':[], 'accecpted':[], 'submission':[], 'topics':[], 'difficulty':[], 'link':[], 'website': [], 'upvotes':[], 'comments': [] }
tot_size= range(len(QUES['link']))

for j in range(int(len(QUES['link'])/32)):
	
	drv=webdriver.Firefox()
	drv.set_window_size(1400,850);	drv.set_window_position(0,0)
	for l in range(32):
		
		i= j*32 + l
		WEBSITE= QUES['link'][i]
		time_lags= [ 0.9 , 0.5 , 0.5 ]
		drv.get(WEBSITE)

		sleep(time_lags[0])

		Prblm_no= ''; Prblm_name= '';  Prblm_text= ''; Prbl_Accept= ''; Prbl_sub= ''
		my_data= {}

		# function to process integers
		def Conv(num_string:str):
			if(num_string[-1]=='K'):
				return int(float(num_string[:-1])*1e3)
			elif(num_string[-1]=='M'):
				return int(float(num_string[:-1])*1e6)
			elif(num_string[-1]=='B'):
				return int(float(num_string[:-1])*1e9)
			else:
				return int(num_string)

		# Collecting the name of the problem
		try:
			elm= drv.find_element(by.XPATH, '/html/body/div[1]/div[2]/div/div/div[4]/div/div/div[4]/div/div[1]/div[1]/div/div/a')
			Prblm_no, Prblm_name= (elm.text).split('. ')
			Prblm_num= int(Prblm_no)
			my_data['id']= Prblm_num; my_data['name']= Prblm_name

			elm1= drv.find_element(by.XPATH, '/html/body/div[1]/div[2]/div/div/div[4]/div/div/div[4]/div/div[1]/div[3]/div')
			Prblm_text= elm1.text
			my_data['text']= Prblm_text.replace('\n', ' ')

			sleep(time_lags[1])

			elm4= drv.find_element(by.XPATH, '/html/body/div[1]/div[2]/div/div/div[4]/div/div/div[4]/div/div[1]/div[4]/div[2]')
			temp= elm4.text.split('\n')
			my_data['accepted']= Conv(temp[1])
			my_data['submission']= Conv(temp[3])

			# finding out topics
			elm5= drv.find_element(by.XPATH, '/html/body/div[1]/div[2]/div/div/div[4]/div/div/div[4]/div/div[1]/div[4]/div[3]/div/div[1]/div[2]')
			elm5.click()

			sleep(time_lags[2] )

			elm6= drv.find_element(by.XPATH, '/html/body/div[1]/div[2]/div/div/div[4]/div/div/div[4]/div/div[1]/div[4]/div[3]/div/div[2]')
			temp= elm6.text.split('\n')
			my_data['topics']= ''
			for val in temp:
				my_data['topics']+= val + ","	

			elm7= drv.find_element(by.XPATH, '/html/body/div[1]/div[2]/div/div/div[4]/div/div/div[4]/div/div[2]/div/div[1]')
			temp= elm7.text.split('\n')
			my_data['upvotes']= Conv(temp[0]);  my_data['comments']= Conv(temp[1])

			df_dict['id'].append(my_data['id']); df_dict['name'].append(my_data['name']); df_dict['text'].append(my_data['text']);	df_dict['accecpted'].append(my_data['accepted'])
			df_dict['comments'].append(my_data['comments']); 	df_dict['submission'].append(my_data['submission']);	df_dict['difficulty'].append(QUES['diff'][i])
			df_dict['topics'].append(my_data['topics']);	df_dict['upvotes'].append(my_data['upvotes']);	df_dict['website'].append('leetcode');	df_dict['link'].append(WEBSITE)

			print(f"question {i} done.")
		except:
			print("Left this one.")
	drv.quit()

df= pd.DataFrame(df_dict)
df.to_json('./gen_data.json')
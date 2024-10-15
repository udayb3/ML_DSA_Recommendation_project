from selenium import webdriver
from selenium.webdriver.common.by import By as by
from time import sleep
import pandas as pd

WEBSITE=['https://www.codechef.com/practice/basic-programming-concepts','https://www.codechef.com/practice/logical-problems','https://www.codechef.com/practice/1-star-difficulty-problems','https://www.codechef.com/practice/2-star-difficulty-problems','https://www.codechef.com/practice/3-star-difficulty-problems','https://www.codechef.com/practice/4-star-difficulty-problems','https://www.codechef.com/practice/5-star-and-above-problems']

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

drv.set_window_size(700,850);	drv.set_window_position(0,0)
QUES= {'link': [], 'diff':[]}
for i in range(len(WEBSITE)):
    drv.get(WEBSITE[i])
    sleep(4)
    link_path='/td[1]/a'
    diff_path='/td[3]'
    common_path='/html/body/div[1]/div[1]/div[3]/div/section/div/div/div/div[3]/div/div/div[2]/div/div/div/div/div/table'
    row_count = len(drv.find_elements(by.XPATH, common_path+'/tr'))
    for row in range(2, row_count):
        try:
            link = drv.find_element(by.XPATH, common_path+f"/tr[{row}]"+link_path)
            diff = drv.find_element(by.XPATH, common_path+f"/tr[{row}]"+diff_path)
            QUES['link'].append(link.get_attribute('href'))
            QUES['diff'].append(diff.text)
        except:
            pass

df= pd.DataFrame(QUES)
df.to_csv('./link_data.csv', index=False)
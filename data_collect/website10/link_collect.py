from selenium import webdriver
from selenium.webdriver.common.by import By as by

WEBSITE='https://www.spoj.com/problems/classical/sort=0,start=0'

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
drv.get(WEBSITE)
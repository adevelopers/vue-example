from splinter import Browser


browser = Browser("chrome")
browser.visit("http://127.0.0.1")
browser.find_by_css(".timer_add .btn").click()
if browser.is_element_present_by_css(".timers_list__item", 2):
    browser.screenshot(name="elogs.png")
    browser.driver.save_screenshot('screenshot.png')
    print("All OK")
else:
    print("Some wrong!")

browser.quit()

import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    let result = element(by.css('h1')).getText() as Promise<string>;
    return result;
  }

  getBeerCards(){
    let result = element.all(by.css('app-truck-contents>div>ul>li'));
    return result;
  }
}

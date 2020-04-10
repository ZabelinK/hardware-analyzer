import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  sleep() {
    browser.sleep(700);
  }
}

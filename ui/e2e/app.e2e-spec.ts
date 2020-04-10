import { AppPage } from './app.po';
import {browser, by, element, ElementArrayFinder} from 'protractor';
import DateTimeFormat = Intl.DateTimeFormat;

describe('Hardware Analiyer', () => {
  let page: AppPage;
  let tabLabels: ElementArrayFinder;

  beforeEach(() => {
    page = new AppPage();
    tabLabels = element.all(by.css('.mat-tab-label'));
  });
  it('PS-1. Tabs should contain Avaliable machines', () => {
    page.navigateTo();
    // tslint:disable-next-line:no-shadowed-variable
    const radioButton = browser.findElement(by.className('mat-radio-button mat-accent'));
    radioButton.click();
    // tslint:disable-next-line:no-shadowed-variable
    const element = browser.findElement(by.id('mat-tab-label-0-0'));
    expect(element.getAttribute('aria-label')).toEqual('Avaliable machines');
  });
  it('PS-1. Tabs should contain Table Data', () => {// tslint:disable-next-line:no-shadowed-variable
    const element = browser.findElement(by.id('mat-tab-label-0-1'));
    expect(element.getAttribute('aria-label')).toEqual('Table Data');
  });
  it('PS-1. Tabs should contain Graphics', () => {
    // tslint:disable-next-line:no-shadowed-variable
    const element = browser.findElement(by.id('mat-tab-label-0-2'));
    expect(element.getAttribute('aria-label')).toEqual('Graphics');
  });
  it('PS-2. Tabel should show name of machine and status', () => {
    // tslint:disable-next-line:no-shadowed-variable
    let element = browser.findElement(by.className('mat-cell cdk-cell cdk-column-machineId mat-column-machineId ng-star-inserted'));
    expect(element.getText()).toEqual('testMachineName');
    element = browser.findElement(by.className('mat-cell cdk-cell cdk-column-status mat-column-status make-green ng-star-inserted'));
    expect(element.getText()).toEqual('RUN');
  });
  it('PS-3. Statistic tabel should show CPU Load, Memorz load, Process, Cound, Last Update', () => {
    page.navigateTo();
    // tslint:disable-next-line:no-shadowed-variable
    const radioButton = browser.findElement(by.className('mat-radio-button mat-accent'));
    radioButton.click();
    // tslint:disable-next-line:no-shadowed-variable
    let element = browser.findElement(by.id('mat-tab-label-0-1'));
    element.click();
    page.sleep();
    // tslint:disable-next-line:max-line-length
    element = browser.findElement(by.className('mat-header-cell cdk-header-cell ng-tns-c75-0 cdk-column-cpu_load mat-column-cpu_load ng-star-inserted'));
    expect(element.getText()).toEqual('CPU Load');
    // tslint:disable-next-line:max-line-length
    element = browser.findElement(by.className('mat-header-cell cdk-header-cell ng-tns-c75-1 cdk-column-memory_load mat-column-memory_load ng-star-inserted'));
    expect(element.getText()).toEqual('Memory load');
    // tslint:disable-next-line:max-line-length
    element = browser.findElement(by.className('mat-header-cell cdk-header-cell ng-tns-c75-2 cdk-column-process mat-column-process ng-star-inserted'));
    expect(element.getText()).toEqual('Procces Count');
    // tslint:disable-next-line:max-line-length
    element = browser.findElement(by.className('mat-header-cell cdk-header-cell ng-tns-c75-3 cdk-column-timestamp mat-column-timestamp ng-star-inserted'));
    expect(element.getText()).toEqual('Last Update');
  });
  it('PS-4. Should have chart for CPU', () => {
    page.navigateTo();
    // tslint:disable-next-line:no-shadowed-variable
    const radioButton = browser.findElement(by.className('mat-radio-button mat-accent'));
    radioButton.click();
    // tslint:disable-next-line:no-shadowed-variable
    let element = browser.findElement(by.id('mat-tab-label-0-1'));
    element.click();
    element = browser.findElement(by.id('mat-tab-label-0-2'));
    element.click();
    page.sleep();
    // tslint:disable-next-line:max-line-length
    element = browser.findElement(by.id('lineChart'));
    expect(element.getId()).toBeTruthy();
  });
  it('PS-5. Should have chart for Memory', () => {
    page.navigateTo();
    // tslint:disable-next-line:no-shadowed-variable
    const radioButton = browser.findElement(by.className('mat-radio-button mat-accent'));
    radioButton.click();
    // tslint:disable-next-line:no-shadowed-variable
    let element = browser.findElement(by.id('mat-tab-label-0-1'));
    element.click();
    element = browser.findElement(by.id('mat-tab-label-0-2'));
    element.click();
    element = browser.findElement(by.id('memoryChart'));
    expect(element.getId()).toBeTruthy();
  });
  it('PS-6. Should have chart for Procces', () => {
    page.navigateTo();
    // tslint:disable-next-line:no-shadowed-variable
    const radioButton = browser.findElement(by.className('mat-radio-button mat-accent'));
    radioButton.click();
    // tslint:disable-next-line:no-shadowed-variable
    let element = browser.findElement(by.id('mat-tab-label-0-1'));
    element.click();
    element = browser.findElement(by.id('mat-tab-label-0-2'));
    element.click();
    element = browser.findElement(by.id('processChart'));
    expect(element.getId()).toBeTruthy();
  });
  it('PS-8. Graphic should have 12h format', () => {
    page.navigateTo();
    const radioButton = browser.findElement(by.className('mat-radio-button mat-accent'));
    radioButton.click();
    // tslint:disable-next-line:no-shadowed-variable
    let element = browser.findElement(by.id('mat-tab-label-0-1'));
    element.click();
    page.sleep();
    element = browser.findElement(by.id('mat-tab-label-0-2'));
    element.click();
    element = browser.findElement(by.id('lineChart'));
    expect(element.getAttribute('format')).toEqual('yyyy-MM-dd HH:mm');
  });
  it('PS-9. Statistic should have 24h format', () => {
    page.navigateTo();
    const radioButton = browser.findElement(by.className('mat-radio-button mat-accent'));
    radioButton.click();
    // tslint:disable-next-line:no-shadowed-variable
    let element = browser.findElement(by.id('mat-tab-label-0-1'));
    element.click();
    page.sleep();
    element = browser.findElement(by.className('mat-cell cdk-cell cdk-column-timestamp mat-column-timestamp ng-star-inserted'));
    expect(element.getAttribute('format')).toEqual('yyyy-MM-dd HH:mm');
  });
  it('PS-10. Statistic table should be able to sort asc/desc', () => {
    page.navigateTo();
    const radioButton = browser.findElement(by.className('mat-radio-button mat-accent'));
    radioButton.click();
    // tslint:disable-next-line:no-shadowed-variable
    let element = browser.findElement(by.id('mat-tab-label-0-1'));
    element.click();
    page.sleep();
    element = browser.findElement(by.className('mat-sort-header-button ng-tns-c75-0'));
    element.click();
    expect(browser.findElement(
        by.className('mat-header-cell cdk-header-cell ng-tns-c75-0 cdk-column-cpu_load mat-column-cpu_load ng-star-inserted'))
        .getAttribute('aria-sort'))
        .toEqual('ascending');
    page.sleep();
    page.sleep();
    element.click();
    expect(browser.findElement(
        by.className('mat-header-cell cdk-header-cell ng-tns-c75-0 cdk-column-cpu_load mat-column-cpu_load ng-star-inserted'))
        .getAttribute('aria-sort'))
        .toEqual('descending');
  });
});

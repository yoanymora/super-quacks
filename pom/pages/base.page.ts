import { type  Page } from '@playwright/test';
import { BASE_URL } from '../data/Constants';


export abstract class BasePage {

    protected readonly page: Page;


    constructor(page: Page) {
      this.page = page;

  }

  async goto(url: string) {
    await this.page.goto(url);
  }


}
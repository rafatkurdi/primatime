import { Browser, BrowserContext, chromium, expect, Page, test } from "@playwright/test";
import Application from "../pages/application";
import { data } from "../support/data";

let browser: Browser;
let context: BrowserContext;
let page: Page;
let App: Application;
const expectedURL = 'https://app.votify.app/?tenant=8f359e0d-ad3b-4ccd-a12f-f215c7a245c5';

test.beforeAll(async () => {
    browser = await chromium.launch();
});

test.beforeEach(async () => {
    context = await browser.newContext({
        recordVideo: {
            dir: 'videos/verifyUserShouldBeAbleToLoginUpWithValidCredentials',
            size: { width: 1300, height: 700 },
        }
    });
    page = await context.newPage();
    App = new Application(page);
    await page.goto("/");
});

test.afterEach(async () => {
    await page.close();
    await context.close();
});

test.afterAll(async () => {
    await browser.close();
});

test("Verify user is able to login successfully with valid Credentials", async () => {
    await page.waitForLoadState();
    await App.LoginPage.enterEmail(data.signUpData.validEmail);
    await App.LoginPage.enterPassword(data.signUpData.password);
    await App.LoginPage.clickOnSubmitButton();
    await page.waitForURL(expectedURL);
    await expect(page).toHaveURL(expectedURL);

});


import { Browser, BrowserContext, chromium, expect, Page, test } from "@playwright/test";
import Application from "../pages/application";
import { data } from "../support/data";

let browser: Browser;
let context: BrowserContext;
let page: Page;
let App: Application;

test.beforeAll(async () => {
    browser = await chromium.launch();
});

test.beforeEach(async () => {
    context = await browser.newContext({
        recordVideo: {
            dir: 'videos/verifyUserShouldBeAbleToSignUpWithValidCredentials',
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

test("Verify user is able to signUp successfully with valid Credentials", async () => {
    await page.waitForTimeout(2000)
    await App.signUpPage.clickOnSignUpButton();
    await App.signUpPage.enterEmail(data.signUpData.email);
    await App.signUpPage.enterPassword(data.signUpData.password);
    await App.signUpPage.enterConfirmPassword(data.signUpData.confirmPassword);
    await App.signUpPage.clickOnSubmitButton();
    await page.waitForTimeout(5000);
    await App.signUpPage.verifyVerificationEmailIsSended(data.signUpData.email);
});


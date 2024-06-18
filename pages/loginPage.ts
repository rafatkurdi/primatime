import { Locator, Page, expect } from "@playwright/test";
import Base from "./base";

export default class loginPage extends Base {
    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    selectors = {
        emailField: '[name="email"]',
        passwordField: '[name="password"]',
        submitButton: '[type="submit"]',
        alertMsg: "div[role='alert'] > .MuiTypography-body1.MuiTypography-root.mui-u5wcbe",
        resendTheLink: ".MuiButtonBase-root.mui-1toljl7  .MuiBox-root.mui-0"

    };


    get emailField(): Locator {
        return this.page.locator(this.selectors.emailField);
    }

    get passwordField(): Locator {
        return this.page.locator(this.selectors.passwordField);
    }

    get submitButton(): Locator {
        return this.page.locator(this.selectors.submitButton).nth(1);
    }

    get resendTheLink(): Locator {
        return this.page.locator(this.selectors.resendTheLink);
    }

    get alertMessage(): Locator {
        return this.page.locator(this.selectors.alertMsg);
    }

    async enterEmail(email: string): Promise<void> {
        await this.emailField.click();
        await this.emailField.fill(email);
    }

    async enterPassword(password: string): Promise<void> {
        await this.passwordField.click();
        await this.passwordField.fill(password);
    }

    async clickOnSubmitButton(): Promise<void> {
        await this.submitButton.click({ force: true });
    }

    async clickOnResendTheLink(): Promise<void> {
        await this.page.waitForTimeout(6000);
        await this.resendTheLink.click({ force: true });
    }

    async verifyInvalidUsernamePasswordValidationMsg(): Promise<void> {
        const verifyVarificationEmail = this.page.locator(this.selectors.alertMsg);
        await expect(verifyVarificationEmail).toBeVisible();
        await expect(verifyVarificationEmail).toContainText('You have entered an invalid username or password');
    }
}
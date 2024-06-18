import { Locator, Page, expect } from "@playwright/test";
import Base from "./base";

export default class signupPage extends Base {
    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    selectors = {
        signupButton: "(//span[@class='MuiBox-root mui-0'])[3]",
        emailField: '[name="email"]',
        passwordField: '[name="password"]',
        confirmPasswordField: '[name="passwordConfirm"]',
        submitButton: '[type="submit"]',
        verifyEmail: "span[class='MuiTypography-root MuiTypography-body2 mui-168daap']",
        alertMsg: "div[role='alert'] > .MuiTypography-body1.MuiTypography-root.mui-u5wcbe",
    };

    get signUpButton(): Locator {
        return this.page.locator(this.selectors.signupButton);
    }

    get emailField(): Locator {
        return this.page.locator(this.selectors.emailField);
    }

    get passwordField(): Locator {
        return this.page.locator(this.selectors.passwordField);
    }

    get confirmPasswordField(): Locator {
        return this.page.locator(this.selectors.confirmPasswordField);
    }

    get submitButton(): Locator {
        return this.page.locator(this.selectors.submitButton).nth(1);
    }

    async clickOnSignUpButton(): Promise<void> {
        await this.signUpButton.click();
    }

    async enterEmail(email: string): Promise<void> {
        await this.emailField.click();
        await this.emailField.fill(email);
    }

    async enterPassword(password: string): Promise<void> {
        await this.passwordField.click();
        await this.passwordField.fill(password);
    }

    async enterConfirmPassword(confirmPassword: string): Promise<void> {
        await this.confirmPasswordField.click();
        await this.confirmPasswordField.fill(confirmPassword);
    }

    async clickOnSubmitButton(): Promise<void> {
        await this.submitButton.click({ force: true });
    }

    async verifyVerificationEmailIsSended(email: string): Promise<void> {
        const verifyVarificationEmail = this.page.locator(this.selectors.verifyEmail);
        await expect(verifyVarificationEmail).toBeVisible();
        await expect(verifyVarificationEmail).toContainText('We sent a verification email to ' + email + '. Please check your inbox.');
    }

    async verifyThisEmailAddressIsAlreadyInUseValidationAlert(): Promise<void> {
        const verifyVarificationEmail = this.page.locator(this.selectors.alertMsg);
        await expect(verifyVarificationEmail).toBeVisible();
        await expect(verifyVarificationEmail).toContainText('This email address is already in use');
    }
}
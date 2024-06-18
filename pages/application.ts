import { Page } from "@playwright/test";
import signupPage from "./signupPage";
import loginPage from "./loginPage";

export default class Application {
    protected page: Page;
    signUpPage: signupPage;
    LoginPage: loginPage;

    constructor(page: Page) {
        this.page = page;
        this.signUpPage = new signupPage(page);
        this.LoginPage = new loginPage(page);
    }
}

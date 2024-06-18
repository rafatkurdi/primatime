const rndInt = Math.floor(Math.random() * 99999) + 1
const rndInt1 = Math.floor(Math.random() * 8888) + 1
export const data = {
    signUpData: {
        companyName: "test",
        email: "test"+ rndInt+"@gmail.com",
        email1: "test"+ rndInt1+"@gmail.com",
        validEmail: 'test1@yopmail.com',
        invalidEmail: 'tester123@gmail.com',
        alreadyUsedEmail: "test@gmail.com",
        password: "testtest",
        confirmPassword: "testtest",      
    },   
};

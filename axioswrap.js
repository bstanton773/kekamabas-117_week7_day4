
const base = "https://cae-bookstore.herokuapp.com"
const authEndpoint = '/user';
const loginEndpoint = '/login';
const questionEndpoint = '/question';


const apiClientNoAuth = () => axios.create({
    baseURL: base
});

const apiClientBasicAuth = (email, password) => axios.create({
    baseURL: base,
    headers: {
        Authorization: 'Basic ' + btoa(email + ':' + password)
    }
})

const apiClientTokenAuth = (token) => axios.create({
    baseURL: base,
    headers: {
        Authorization: 'Bearer ' + token
    }
})


const registerUser = async (data) => {
    let error;
    try{
        await apiClientNoAuth().post(authEndpoint, data);
    }catch(err){
        error = 'An unexpected error occurred. Please try again later.'
    }
    return {
        error
    }
}


const loginUser = async (email, password) => {
    let error;
    let user;

    try{
        const response = await apiClientBasicAuth(email, password).get(loginEndpoint);
        user = response.data
    } catch (err) {
        if (err.response.status===401){
            error = "Invalid Email/Password Combo"
        } else {
            error = 'An unexpected error occurred. Please try again later.'
        }
    }
    
    return {
        error,
        user
    }
}

const editUser = async (token, data) => {
    let error;
    
    try{
        await apiClientTokenAuth(token).put(authEndpoint, data);
    } catch(err){
        error = 'An unexpected error occurred. Please try again later.'
    }

    return { error }
}


const getAllQuestions = async () => {
    let error;
    let questions;

    const res = await apiClientNoAuth().get(questionEndpoint + '/all');
    if (res.status===200){
        questions = res.data.questions;
    } else {
        error = 'An unexpected error occured. Please Try Again Later.'
    }

    return {
        error,
        questions
    }
}


const createQuestion = async (token, data) => {
    let error;
    let id;
    
    try {
        const res = await apiClientTokenAuth(token).post(questionEndpoint, data);
        console.log(res);
        id = res.data.id;
    } catch(err){
        error = 'An unexpected error occured. Please Try Again Later.'
    }

    return {
        error,
        id
    }
}



// Code to Test Our Wrapper Functions

// test registering a new user

const reg = async () => {
    let result = await registerUser(
        {
            "email": "mjordan23@bulls.com",
            "first_name": "Michael",
            "last_name": "Jordan",
            "password": "6rings"
        }
    );
    console.log(result.error??"Successfully created user");
};;

// Call function to create the user (only do it once or there will be errors)
// reg();


// test logging a user in  
const login = async () => {
    let result = await loginUser('mjordan23@bulls.com', '6rings');
    console.log(result.error ?? 'Success Connecting');
    console.log(result.user ?? 'Bad Login')
    console.log('your token is ', result.user.token);
}

// login();


// Save the token for our future token auth endpoints
const myToken = 'mwftJkqXxz2cqrK2-blrcN8Xtk-4ETqzN5A84Cmz6Zk'


// Test editing a user
const changeUserEmail = async () => {
    let result = await editUser(myToken, { "email": "mj23@bulls.com"});
    console.log(result.error ?? "Successfully edited user")
};

changeUserEmail();

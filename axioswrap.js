
const base = "https://cae-bookstore.herokuapp.com"
const authEndpoint = '/user';
const loginEndpoint = '/login';
const questionEndpoint = '/question';


const apiClientNoAuth = () => axios.create({
    baseURL: base
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

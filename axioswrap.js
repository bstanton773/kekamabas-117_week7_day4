
const base = "https://cae-bookstore.herokuapp.com"
const authEndpoint = '/user';
const loginEndpoint = '/login';
const questionEndpoint = '/question';


const apiClientNoAuth = () => axios.create({
    baseURL: base
})




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

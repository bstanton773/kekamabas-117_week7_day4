assert=require('assert');

//=====================================
// reverse each word in the sentence
// For Example:
// Ohana means family
// becomes:
// anahO snaem ylimaf

// Write your function named "solution" here:
function solution(sentence){
    let output = '';
    let words = sentence.split(' ');
    for (let word of words){
        let reversed = '';
        for (let i = word.length - 1; i >= 0; i--){
            reversed += word[i];
        }
        output += reversed + ' '
    }
    return output.trim()
}



//=====================================

try{
    assert(solution("Some people are worth melting for")==="emoS elpoep era htrow gnitlem rof")
    
    assert(solution("Ohana means family")==="anahO snaem ylimaf")
    
    assert(solution("Love is putting someone else's needs before yours")==="evoL si gnittup enoemos s'esle sdeen erofeb sruoy")
    
    assert(solution("Happiness is the richest thing we will ever own")==="ssenippaH si eht tsehcir gniht ew lliw reve nwo")
    
    assert(solution("Think happy thoughts")==="knihT yppah sthguoht")
    
    assert(solution("Everything the light touches is our kingdom")==="gnihtyrevE eht thgil sehcuot si ruo modgnik")
    
    assert(solution("racecar")==="racecar")

    console.log("PASSED")
}catch{
    console.log("FAILED")
}
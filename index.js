'use strict';

let QUESTION_NUMBER = 0;   //the current question# user is on
let SCORE = 0;  //the current score; the # of correct answers so far



// QUESTIONS holds the list of questions in the app, along with their given possible answers and the correct
//answer.
const QUESTIONS = [
    {question: 'The Statue of Liberty was originally a gift from which country?', 
     choices: ['Italy', 'Denmark', 'France', 'Spain'],
     correctAnswer: 'France'},

     {question: 'In what state is the Grand Canyon?', 
     choices: ['California', 'Utah', 'Colorado', 'Arizona'],
     correctAnswer: 'Arizona'},

     {question: 'Which city has the highest cost of living?', 
     choices: ['Honolulu', 'Los Angeles', 'San Francisco', 'New York City'],
     correctAnswer: 'New York City'},

     {question: 'In which state is John F. Kennedy buried?', 
     choices: ['Maine', 'Texas', 'Colorado', 'Massachussetts'],
     correctAnswer: 'Massachussetts'},

     {question: 'Which president was the only one elected after running unopposed?', 
     choices: ['Abraham Lincoln', 'James Madison', 'George Washington', 'Theodore Roosevelt'],
     correctAnswer: 'George Washington'},

     {question: 'Roosevelt won the 1932 election , but who lost it?', 
     choices: ['Harry S. Truman', 'Herbert Hoover', 'Calvin Coolidge', 'John F. Kennedy'],
     correctAnswer: 'Herbert Hoover'},

     {question: 'How many stripes are on the U.S flag?', 
     choices: ['11', '12', '13', '14'],
     correctAnswer: '13'},

     {question: 'How many presidents has the U.S. had up to 2018?', 
     choices: ['42', '43', '44', '45'],
     correctAnswer: '45'},

     {question: 'How many states are in the U.S.?', 
     choices: ['49', '50', '51', '52'],
     correctAnswer: '50'},

     {question: 'What is the largest state in the U.S.?', 
     choices: ['Texas', 'California', 'Alaska', 'Hawaii'],
     correctAnswer: 'Alaska'}
];

const numberOfQuestions = QUESTIONS.length;


function resetVariables()
{
    QUESTION_NUMBER = 0;
    SCORE = 0;   
}

function renderHomePage() 
{
    // this function will be responsible for rendering the initial page (the Home Page) in the DOM
    //reset score to zero
    //reset question# to zero    
    resetVariables();

    window.location.reload();
}

function generateHTMLForIncorrectAnswer()
{
    let quesNumIndex = QUESTION_NUMBER -1;
    let answer = QUESTIONS[quesNumIndex].correctAnswer;
    
    return `<h2>That is incorrect. <br/>The correct answer is: ${answer}.</h2>
    
    <button class="nextButton" role="button">Next</button>`; 
}


function generateHTMLForCorrectAnswer()
{    
    return `<h2>That's correct!</h2>
    
      <button class="nextButton" role="button">Next</button>`;
}

function incrementScore()
{    
    SCORE = SCORE + 1;
    $('.js-score').text(SCORE);
}


function displayAnswerFeedback(result)
{
    // this function will be responsible for displaying on the screen if the selected answer is right or wrong
    //and updating the score on displaying it
    if (result === true)
    {
        //tell the user they are correct                        
        $('div.questionAnswerPanel').html(generateHTMLForCorrectAnswer());
        
        //update score
        incrementScore();
    }
    else
            //tell the user they are incorrect;
         $('div.questionAnswerPanel').html(generateHTMLForIncorrectAnswer());
    
}


function generateHTMLForFinalScore()
{
    
    return `<h2>You got ${SCORE}/${QUESTIONS.length} correct.</h2>
    
      <button class="restartButton" role="button">Restart quiz.</button>`;   
  
}

function displayFinalScorePanel()
{
    // this function will be responsible for displaying the final score on the screen
    $('div.questionAnswerPanel').html(generateHTMLForFinalScore());
}


function incrementQuestionNumber()
{
    QUESTION_NUMBER = QUESTION_NUMBER + 1;
    $('.js-questionNumber').text(QUESTION_NUMBER);
}




function generateHTMLForQuestion()
{
    let quesNumIndex = QUESTION_NUMBER -1;
    
    let ques = QUESTIONS[quesNumIndex].question;
    let choice1 = QUESTIONS[quesNumIndex].choices[0];
    let choice2 = QUESTIONS[quesNumIndex].choices[1];
    let choice3 = QUESTIONS[quesNumIndex].choices[2];
    let choice4 = QUESTIONS[quesNumIndex].choices[3];
    
   
   return`<h2>${ques}</h2>
   <form>
   <div role="radiogroup" id="question_item">
   <ul  aria-labelledby="question_item">
     
       <li>      
       <label>
         <input class="answer" type="radio"  value='${choice1}' name="option" checked aria-checked="true" aria-labelledby="question_item"> </input>
         <span>${choice1}</span>
       </label>
       </li>
 
       <li>
       <label>
         <input class="answer" type="radio" value='${choice2}' name="option" aria-checked="false" aria-labelledby="question_item"></input>
         <span>${choice2}</span>
       </label>
       </li>
 
       <li>
       <label>
         <input class="answer" type="radio" value='${choice3}' name="option" aria-checked="false" aria-labelledby="question_item"></input>
         <span>${choice3}</span>
       </label>
       </li>
 
       <li>
       <label>
         <input class="answer" type="radio" value='${choice4}' name="option" aria-checked="false" aria-labelledby="question_item"></input>
         <span>${choice4}</span>
       </label>
       </li>

     </ul>  
     </div>
     <button  type="submit"  class="submitButton">Submit</button>
    
   </form>`;
   
}

function showNextQuestion(event)
{
    //-first increment the question#
    incrementQuestionNumber();    

    //show the question
    $('div.questionAnswerPanel').html(generateHTMLForQuestion());    
    
}



function handleStartButtonClick()
{
    //this function is the event handler for when the user clicks on the Start Button in the Main Page.
    //it will start the quiz.  It will show the question and update the question#.
    $('.mainPagePanel').on('click', '.js-beginButton',function (event) {
        
        $('.mainPagePanel').remove();        

        showNextQuestion(event);        
    });
}


function getUserAnswer(event)
{    
    return $('input:checked').siblings('span').text();   
}


function verifyUserAnswer(event)
{
    //get the user's answer    
    let ans =getUserAnswer(event);

    //see if the user's answer is the correct answer
    if(ans ===  QUESTIONS[QUESTION_NUMBER - 1].correctAnswer)
        return true;
    else
        return false;
}

function handleSubmitButtonClick()
{
    //this function is the event handler for when the user clicks on the Submit Button in the Question Page.
    //It will check if the user picked the right answer.  If they did pick the correct answer, it will
    //update the score.  Else (ie, they picked the wrong answer) it will display that the user is wrong and
    //what the correct answer is.    
    
    $('body').on('submit', function (event) {
        event.preventDefault();
        
        //first check if the user chose the correct or wrong answer
        let userCorrect = verifyUserAnswer(event);
        
        //display feedback page
        displayAnswerFeedback(userCorrect);        
    });    
}


function handleNextButtonClick()
{
    //this function is the event handler for when the user clicks on the Next Button in the Feedback Page.
    //if haven't reached the last question yet: it will show the next question and update the question#
    //else (ie there's no more questions) it will show the last page

    $('.questionAnswerPanel').on('click', '.nextButton', function (event) {
        event.preventDefault();

        if(QUESTION_NUMBER != QUESTIONS.length)
        {
            //there are still more questions, so display the next one
            showNextQuestion(event);
        }
        else
        {
            //show last page
            displayFinalScorePanel();
        }
        
    });
}

function handleRestartButtonClick()
{
    //this function is the event handler for when the user clicks on the Restart Button in the final score Page.
    //It will take the user to the home page/start page of the quiz.
    $('body').on('click', '.restartButton', function (event){        
        renderHomePage();
    });
}


function handleQuiz()
{
    //this function is the callback for when the page loads.  It will handle all the events that occur in the quiz.    
    handleStartButtonClick();
    handleSubmitButtonClick();
    handleNextButtonClick();
    handleRestartButtonClick();
}

$(handleQuiz);


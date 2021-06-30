import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  initialLoad = true;
  page = 0;
  displayQuestion: {
    question: string;
    ans: string;
    option: Array<{ key: string; value: string }>;
  };
  questions = [
    {
      question: 'What is your name',
      ans: '1',
      option: [
        {
          key: '1',
          value: 'Subash',
        },
        {
          key: '2',
          value: 'Sujil',
        },
        {
          key: '3',
          value: 'Nabina',
        },
        {
          key: '4',
          value: 'Ratbe',
        },
      ],
    },
  ];

  selectedValue = null;
  correctOption = null;
  check = false;
  finish = false;
  marks = 0;
  currectPage = null;
  selectedAnswer = [];
  correctOptionArr = [];
  attempt= 0;
  constructor() {}

  ngOnInit(): void {
    this.questions = JSON.parse(localStorage.getItem('questions'));
  }

  startQuz() {
    this.initialLoad = false;
    this.displayQuestion = this.questions[this.page];
  }

  selectedOption(value) {
    this.selectedValue = value;
    this.correctOption = this.displayQuestion.ans;
  }

  done() {
    this.attempt += 1; 
    this.check = true;
    this.correctOption = this.displayQuestion.ans;
    if(this.correctOption == this.selectedValue){
      this.marks +=1;
    }
    this.selectedAnswer.push(this.selectedValue);
    this.correctOptionArr.push(this.correctOption);
  }

  next() {
    this.page += 1;
    if(this.page > (this.attempt-1)){
      this.currectPage = null;
    }

    if(this.page <= (this.attempt-1)){
      this.selectedValue = this.selectedAnswer[this.page];
      this.correctOption = this.correctOptionArr[this.page];
    }

    if(this.currectPage === null){
      this.check = false;
      this.selectedValue = null;
      this.correctOption = null;
    }
    this.displayQuestion = this.questions[this.page];
   
  }

  finishQuiz() {
    this.finish = true;
    this.check = false;
  }

  reset() {
    this.initialLoad = true;
    this.finish = false;
    this.page = 0;
    this.marks = 0;
  }

  back() {
    if(this.currectPage === null) {
      this.currectPage = this.attempt - 1;;
    }
    this.page -= 1;
    this.selectedValue = this.selectedAnswer[this.page];
    this.correctOption = this.correctOptionArr[this.page];
    this.displayQuestion = this.questions[this.page];
    this.check = true;       
  }
}

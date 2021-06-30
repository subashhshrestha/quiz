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
    this.check = true;
    this.correctOption = this.displayQuestion.ans;
    if(this.correctOption == this.selectedValue){
      this.marks +=1;
    }
  }

  next() {
    this.check = false;
    this.selectedValue = null;
    this.correctOption = null;
    this.page += 1;
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
}

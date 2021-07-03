import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'app-real-test',
  templateUrl: './real-test.component.html',
  styleUrls: ['./real-test.component.scss'],
})
export class RealTestComponent implements OnInit {
  timeLeft: number = 5400;
  isTestStart = false;
  isTestComplete = false;
  subscribeTimer: any;

  displayQuestion: {
    question: string;
    ans: string;
    option: Array<{ key: string; value: string }>;
    selected: string;
  };
  questions = [];
  selectedValue = null;
  page = 0;
  isLoading = false;
  marks = 0;
  _subscriber = null;

  constructor(private router: Router) {}

  ngOnInit() {
    let questions = localStorage.getItem('questions');
    if (questions) {
      this.questions = JSON.parse(localStorage.getItem('questions'));
      this.questions = _.shuffle(this.questions);
      this.questions = _.slice(this.questions, 0, 100);
      this.questions = this.questions.map((question) => {
        question.selected = null;
        return question;
      });
    } else {
      this.router.navigate(['upload']);
    }
  }

  startTest() {
    const source = timer(1000, 1000);
    this.displayQuestion = this.questions[this.page];
    this.isLoading = true;
    this._subscriber = source.subscribe((val) => {
      console.log(val);
      this.isTestStart = true;
      this.isTestComplete = false;
      this.isLoading = false;
      this.subscribeTimer = moment.utc((this.timeLeft - val) * 1000).format('HH:mm:ss');
      if (this.timeLeft <= 0) {
        this.isTestStart = false;
        this.isTestComplete = true;
        this._subscriber.unsubscribe();
        this.calculateMarks();
      }
    });
  }

  selectedOption(value) {
    this.selectedValue = value;
  }

  next() {
    this.questions[this.page]['selected'] = this.selectedValue;
    localStorage.setItem('testQuestions', JSON.stringify(this.questions));
    this.page += 1;
    this.selectedValue = null;
    this.displayQuestion = this.questions[this.page];
  }

  finishQuiz() {
    this.isTestStart = false;
    this.isTestComplete = true;
    this._subscriber.unsubscribe();
    this.calculateMarks();
  }

  calculateMarks() {
    this.isLoading = true;
    this.questions.forEach((question) => {
      if (question.selected === question.ans) {
        this.marks += 1;
      }
    });
    this.isLoading = false;
  }

  reset() {
    this.timeLeft = 5400;
    this.isLoading = false;
    this.isTestStart = false;
    this.isTestComplete = false;
    this.questions = JSON.parse(localStorage.getItem('questions'));
    this.questions = _.shuffle(this.questions);
    this.questions = _.slice(this.questions, 0, 100);
    this.questions = this.questions.map((question) => {
      question.selected = null;
      return question;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  quizName = 'questions';
  initialLoad = true;
  displayPage = 1;
  page = 0;
  displayQuestion: {
    question: string;
    ans: string;
    option: Array<{ key: string; value: string }>;
    selected: string;
  };
  questions = [];

  selectedValue = null;
  finish = false;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.quizName =
      this.activatedRoute.snapshot.queryParams['quiz'] || 'questions';
    let questions = localStorage.getItem(this.quizName);
    if (questions) {
      this.questions = JSON.parse(questions);
    } else {
      this.router.navigate(['/']);
    }
  }

  startQuz() {
    this.page = this.displayPage - 1;
    this.initialLoad = false;
    this.displayQuestion = this.questions[this.page];
  }

  selectedOption(value) {
    this.selectedValue = value;
  }

  done() {
    this.questions[this.page]['selected'] = this.selectedValue;
    localStorage.setItem(this.quizName, JSON.stringify(this.questions));
  }

  next() {
    this.page += 1;
    this.selectedValue = null;
    this.displayQuestion = this.questions[this.page];
  }

  finishQuiz() {
    this.finish = true;
  }

  reset() {
    this.initialLoad = true;
    this.finish = false;
    this.page = 0;
    this.selectedValue = null;
    this.questions = this.questions.map((question) => {
      question.selected = null;
      return question;
    });
    localStorage.setItem(this.quizName, JSON.stringify(this.questions));
  }

  back() {
    this.page -= 1;
    this.selectedValue = null;
    this.displayQuestion = this.questions[this.page];
  }

  startTest() {
    this.router.navigate(['test'], { queryParams: { quiz: this.quizName } });
  }
}

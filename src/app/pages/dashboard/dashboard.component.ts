import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isListEmpty = false;
  quizList = [];
  quizName = '';
  constructor(private router: Router) {}

  ngOnInit() {
    let quizList = localStorage.getItem('quizList');
    if (!quizList) {
      this.isListEmpty = true;
    } else {
      this.quizList = JSON.parse(quizList);
    }
  }

  addQuiz() {
    this.router.navigate(['upload'], {
      queryParams: { quizName: this.quizName },
    });
  }

  itemClicked(item) {
    this.router.navigate(['home'], { queryParams: { quiz: item } });
  }
}

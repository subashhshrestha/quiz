import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit, OnDestroy {
  products = null;
  loading = false;
  invalidHeaderError = 'Hey You Please enter a file with correct header';
  invalidHeader = false;

  constructor(private meta: Meta) {
    this.meta.updateTag({ name: 'viewport', content: 'width=500px, initial-scale=1' });
  }
  ngOnDestroy(): void {
    this.meta.updateTag({ name: 'viewport', content: 'width=device-width, initial-scale=1' });
  }

  ngOnInit(): void {}

  uploadExcel(e) {
    try {
      this.loading = true;
      this.invalidHeader = false;
      const fileName = e.target.files[0].name;

      import('xlsx').then((xlsx) => {
        let workBook = null;
        let jsonData = null;
        const reader = new FileReader();
        // const file = ev.target.files[0];
        reader.onload = (event) => {
          const data = reader.result;
          workBook = xlsx.read(data, { type: 'binary' });
          jsonData = workBook.SheetNames.reduce((initial, name) => {
            const sheet = workBook.Sheets[name];
            initial[name] = xlsx.utils.sheet_to_json(sheet, { raw: false });
            return initial;
          }, {});
          this.products = jsonData[Object.keys(jsonData)[0]];
          let questions = [];
          if (
            !(
              'Question' in this.products[0] &&
              'correct option number' in this.products[0] &&
              'Option 1' in this.products[0] &&
              'Option 2' in this.products[0] &&
              'Option 3' in this.products[0] &&
              'Option 4' in this.products[0]
            )
          ) {
            this.loading = false;
            this.invalidHeader = true;
          }
          if (!this.invalidHeader) {
            this.products.forEach((p) => {
              let question = {};
              question['question'] = p['Question'];
              question['ans'] = p['correct option number'].toString();
              question['option'] = [
                {
                  key: '1',
                  value: p['Option 1'],
                },
                {
                  key: '2',
                  value: p['Option 2'],
                },
                {
                  key: '3',
                  value: p['Option 3'],
                },
                {
                  key: '4',
                  value: p['Option 4'],
                },
              ];
              questions.unshift(question);
            });
            localStorage.setItem('questions', JSON.stringify(questions));
            this.loading = false;
          }
        };
        reader.readAsBinaryString(e.target.files[0]);
      });
    } catch (e) {
      this.loading = false;
      console.log('error', e);
    }
  }
}

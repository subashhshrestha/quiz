import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  products = null;
  constructor() { }

  ngOnInit(): void {
  }

  uploadExcel(e) {
  debugger
    try{
    
    const fileName = e.target.files[0].name;
    
    import('xlsx').then(xlsx => {
      let workBook = null;
      let jsonData = null;
      const reader = new FileReader();
      // const file = ev.target.files[0];
      reader.onload = (event) => {
        debugger
        const data = reader.result;
        workBook = xlsx.read(data, { type: 'binary' });
        jsonData = workBook.SheetNames.reduce((initial, name) => {
          const sheet = workBook.Sheets[name];
          initial[name] = xlsx.utils.sheet_to_json(sheet);
          return initial;
        }, {});
        this.products = jsonData[Object.keys(jsonData)[0]];
        let questions = []
        this.products.forEach(p=>{
          let question = {}
          question['question'] = p['Question'];
          question['ans'] = p['correct option number'].toString();
          question['option'] = [
            {
              key: '1',
              value: p['Option 1']
            },
            {
              key: '2',
              value: p['Option 2']
            },
            {
              key: '3',
              value: p['Option 3']
            },
            {
              key: '4',
              value: p['Option 4']
            }
          ]
          questions.unshift(question);
        })
        localStorage.setItem('questions', JSON.stringify(questions));
  
      };
      reader.readAsBinaryString(e.target.files[0]);
    });
  
  }catch(e){
     console.log('error', e);
  }
  
  }

}

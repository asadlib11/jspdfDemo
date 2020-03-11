import { Component } from '@angular/core';
import jsPDF from 'jspdf';
require('jspdf-autotable');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jspdfDemo';
 
  createPDF(){
    let columns = ["ID", "Name", "Age", "City"];
    var data = [
      [1, "Jonatan", 25, "Gothenburg"],
      [2, "Simon", 23, "Gothenburg"],
      [3, "Hanna", 21, "Stockholm"]
    ];
    const doc = new jsPDF(); // or let doc = new jsPDF.default();
    doc.autoTable(columns, data);
    doc.save("filename");
  }
  createHTMLpdf(){

  }

  withContent(){
    console.log("With content")
      const doc = new jsPDF()
    
      doc.setFontSize(18)
      doc.text('With content', 14, 22)
      doc.setFontSize(11)
      doc.setTextColor(100)
    
      // jsPDF 1.4+ uses getWidth, <1.4 uses .width
      var pageSize = doc.internal.pageSize;
      var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
      let fakeSentence = "sdafasdfkasbdfjkshadjkfhasjkdfhkasdhfjksahdfjkasjkd shdafjkhsadjkfhs fhasdkjfhsadjkfh safhsadfhsjkdhf";
      var text = doc.splitTextToSize(fakeSentence, pageWidth - 35, {});
      doc.text(text, 14, 30);
    
      doc.autoTable({
        head: this.headRows(),
        body: this.bodyRows(40),
        startY: 50,
        showHead: 'firstPage',
      });
    
      doc.text(text, 14, doc.autoTable.previous.finalY + 10);
      doc.save("filename");
    }

    headRows() {
      return [
        { id: 'ID', name: 'Name', email: 'Email', city: 'City', expenses: 'Sum' },
      ]
    }

    bodyRows(rowCount) {
      rowCount = rowCount || 10
      let body = []
      for (var j = 1; j <= rowCount; j++) {
        body.push({
          id: j,
          name: "lorenipsum",
          email: "lorenipsum",
          city: "lorenipsum",
          expenses: "lorenipsum",
        })
      }
      return body
    }

}

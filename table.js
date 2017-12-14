class Table{
	
 loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     var data=JSON.parse(this.responseText);
	 let table=createTable(data.rows.length, data.columns.length);
	 
	 fillTable(table, data);	
	 addListenersForTableHeadElements();
	 
    }
  };
 xhttp.open("GET", "http://ickata.net/sag/api/staff/bonuses/", true);
  xhttp.send();
	
	
	
	function addListenersForTableHeadElements(){
		for(let index=0;index<document.querySelectorAll('th').length;index++){
		document.querySelectorAll('th')[index].addEventListener('click',sort);
		let attribute=document.createAttribute("isAscend");
		attribute.value=true;
		document.querySelectorAll('th')[index].setAttributeNode(attribute); 
	 }
	}
	function sort(event){
	var listOfNames= document.querySelectorAll('tbody')[0].querySelectorAll('tr');
	let elements = [].slice.call(listOfNames);

	elements.sort(function(a,b){
			let data= checkWhichHeaderWasClicked(event);
			let index= getIndexOfTheCorrectData(data);
			let value=checkIsAscendAttributeValue(event);
			if(value==='true'){
				event.target.setAttribute('isAscend',!value);
				if(isNaN(a.querySelectorAll('td')[index].innerHTML.toLowerCase())){
					if(a.querySelectorAll('td')[index].innerHTML.toLowerCase() < b.querySelectorAll('td')[index].innerHTML.toLowerCase()) return -1;
					if(a.querySelectorAll('td')[index].innerHTML.toLowerCase() > b.querySelectorAll('td')[index].innerHTML.toLowerCase()) return 1;
					return 0;
				}
				else{
					return ((a.querySelectorAll('td')[index].innerHTML)-(b.querySelectorAll('td')[index].innerHTML));
				}
			}else{
				event.target.setAttribute('isAscend',!value);
				if(isNaN(a.querySelectorAll('td')[index].innerHTML.toLowerCase())){
					if(a.querySelectorAll('td')[index].innerHTML.toLowerCase() > b.querySelectorAll('td')[index].innerHTML.toLowerCase()) return -1;
					if(a.querySelectorAll('td')[index].innerHTML.toLowerCase() < b.querySelectorAll('td')[index].innerHTML.toLowerCase()) return 1;
					return 0;
				}
				else{
					return ((b.querySelectorAll('td')[index].innerHTML)-(a.querySelectorAll('td')[index].innerHTML));
				}
			}
			
		function checkIsAscendAttributeValue(event){
			return event.target.getAttribute('isAscend');
				
			
		}	
		
		function checkWhichHeaderWasClicked(event){
			return event.target.innerHTML;
		}
		function getIndexOfTheCorrectData(data){
			let sth=a.querySelectorAll('td');
			for(let index=0;index<sth.length;index++){
				if(sth[index].getAttribute('class')===data){
					return index;
				}
			}
		}
	}
		
	);
	for(let i=0;elements.length;i++){
		document.querySelector('tbody').appendChild(elements[i]);
	}
	elements=null;
  }
	
	function fillTable(table,data){
		 for(let i=0;i<data.columns.length;i++){
		 table.rows[0].cells[i].innerHTML=data.columns[i];
	 }
	 for(let i=1;i<table.rows.length;i++){
		for(let j=0;j<table.rows[0].cells.length;j++){
			if(!isNaN(data.rows[i-1][j])){
			table.rows[i].cells[j].innerHTML=data.rows[i-1][j].toFixed(2);
			}else{
			table.rows[i].cells[j].innerHTML=data.rows[i-1][j];
			}
			let attribute=document.createAttribute("class");
			attribute.value=document.querySelector("tr").querySelectorAll('th')[j].innerHTML;
			table.rows[i].cells[j].setAttributeNode(attribute);
		}
	 }
	}
	function createTable(rowsNum, columnsNum){	
		let table= document.getElementById('container').appendChild(document.createElement('table'));
		let tableHead=table.appendChild(document.createElement('thead'));
		let tableHeadRow= tableHead.appendChild(document.createElement('tr'));
		for(let i=0; i<columnsNum;i++){
			tableHeadRow.appendChild(document.createElement('th'));
		}
		
		let tableBody=table.appendChild(document.createElement('tbody'));
		for(let i=0; i<rowsNum;i++){
			let tableBodyRow=tableBody.appendChild(document.createElement('tr'));
			for(let y=0;y<columnsNum;y++){
				let tableData=tableBodyRow.appendChild(document.createElement('td'));
				
				
			}
		}
		return table;
	}
  }
  
 
}
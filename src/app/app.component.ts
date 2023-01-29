import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'currency';
  
  constructor( private http:HttpClient) { }

  theme:boolean = true

  getTheme() {
    let theme = localStorage.getItem('theme');
    this.theme = theme === 'true' ? true : false;
    document.documentElement.style.setProperty('--h1-color', this.theme ? '#20509e' : '#e3e7e9')
    document.documentElement.style.setProperty('--h1-responsive-color', this.theme ? 'white' : '#e3e7e9')
    document.documentElement.style.setProperty('--mode-icon-color', this.theme ? '#eff3f5' : '#1a1c1f')
    document.documentElement.style.setProperty('--mode-active-icon', this.theme ? '#16d0c5' : '#4b5a6b')
    document.documentElement.style.setProperty('--bg-color', this.theme ? '#eff3f5' : '#1a1c1f')
    document.documentElement.style.setProperty('--card-color', this.theme ? 'white' : '#262d35')
    document.documentElement.style.setProperty('--input-color', this.theme ? '#1e1e1f' : '#e3e7e9')
    document.documentElement.style.setProperty('--select-color', this.theme ? '#1e1e1f' : '#e3e7e9')
    document.documentElement.style.setProperty('--option-bg-color', this.theme ? 'white' : '#262d35')
    document.documentElement.style.setProperty('--change-color', this.theme ? '#16d0c5' : '#16d0c5')
    document.documentElement.style.setProperty('--box-shadow', this.theme ? 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' : 'rgba(12, 12, 12, 0.2) 0px 2px 8px 0px')
    document.documentElement.style.setProperty('--i-background-color', this.theme ? 'rgb(217, 243, 255)' : 'rgb(46, 62, 73)')
  }

  changeTheme(){
    this.theme = !this.theme
    document.documentElement.style.setProperty('--h1-color', this.theme ? '#20509e' : '#e3e7e9')
    document.documentElement.style.setProperty('--h1-responsive-color', this.theme ? 'white' : '#e3e7e9')
    document.documentElement.style.setProperty('--mode-icon-color', this.theme ? '#eff3f5' : '#1a1c1f')
    document.documentElement.style.setProperty('--mode-active-icon', this.theme ? '#16d0c5' : '#4b5a6b')
    document.documentElement.style.setProperty('--bg-color', this.theme ? '#eff3f5' : '#1a1c1f')
    document.documentElement.style.setProperty('--card-color', this.theme ? 'white' : '#262d35')
    document.documentElement.style.setProperty('--input-color', this.theme ? '#1e1e1f' : '#e3e7e9')
    document.documentElement.style.setProperty('--select-color', this.theme ? '#1e1e1f' : '#e3e7e9')
    document.documentElement.style.setProperty('--option-bg-color', this.theme ? 'white' : '#262d35')
    document.documentElement.style.setProperty('--change-color', this.theme ? '#16d0c5' : '#16d0c5')
    document.documentElement.style.setProperty('--box-shadow', this.theme ? 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' : 'rgba(12, 12, 12, 0.2) 0px 2px 8px 0px')
    document.documentElement.style.setProperty('--i-background-color', this.theme ? 'rgb(217, 243, 255)' : 'rgb(46, 62, 73)')
    localStorage.setItem('theme', this.theme.toString())
  }

  arr:any[] = []

  ngOnInit(): void {

    this.getTheme()
    
    this.http.get("https://open.er-api.com/v6/latest/usd")
    .subscribe((data:any) => {
      for(var [a,b] of Object.entries(data.rates)){
        let obj = {
         cur:a,
         val:b
        }
        this.arr.push(obj)
      }
    })
  }

  currency1:string = ""
  currency2:string = ""
  input1:any 
  input2:any 
  equal:any
  
  ref(){
    this.http.get("https://open.er-api.com/v6/latest/"+this.currency1)
    .subscribe((data:any)=>{
      let val = data.rates[this.currency2]
      this.equal = this.input1 * val
      this.input2 = this.equal
    })
  }

  change(){
    let x = this.currency1
    this.currency1 = this.currency2
    this.currency2 = x

    let y = this.input1
    this.input1 = this.input2
    this.input2 = y
  }
}



import{makeAutoObservable} from 'mobx'

export default class counterstore {
  title = "Counter store";
  count = 42;
  events: string[] = [
    `Initial count is ${this.count}`
  ]
  constructor(){
    makeAutoObservable(this)
  }
  //using => to bound the function to the class (otherwise action.bound)
  increment = (amount = 1) => {
    this.count += amount
    this.events.push(`Incerented by ${amount} - count now is ${this.count}`)
  }
  decrement = (amount = 1) => {
    this.count -= amount
    this.events.push(`decerented by ${amount} - count now is ${this.count}`)
  }
  get eventCount(){
    return this.events.length
  }
}
export var states = [
  "Ready for Safety",
  "Ready",
  "Repairing",
  "Scheduled"
]

export class Robot {
  id? : String;
  name? : String;
  state? : String;
  fightCount? : number;
  winCount? : number;
  lossCount? : number;
  koCount? : number;
  alive? : boolean;
  weightClass? : number;
  //timestamp: Date;
  //TODO: Fill in the rest
}
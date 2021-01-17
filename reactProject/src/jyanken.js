export default class Jyanken {
  constructor() {
    this.scores = [];
    this.statuses = [0, 0, 0];
  }
  pon(human_hand, computer_hand = Math.floor(Math.random() * 3)) {
    const judgement = (computer_hand - human_hand + 3) % 3;
    this.scores.push({
      human: human_hand,
      computer: computer_hand,
      created_at: new Date(),
      judgement: judgement,
    });
    this.statuses[judgement]++;
  }
  getScores() {
    let scores = this.scores;
    if (this.scores.length !== 0) {
      scores.reverse;
    }
    return scores;
  }
  getStatuses() {
    return {
      draw: this.statuses[0],
      win: this.statuses[1],
      lose: this.statuses[2],
    };
  }
}
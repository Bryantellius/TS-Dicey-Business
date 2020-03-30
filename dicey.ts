import $ from "jquery";

class Die {
  value: number;
  constructor() {
    this.value = 0;
  }

  roll() {
    this.value = Math.floor(Math.random() * 6) + 1;
    return this.value;
  }

  create() {
    $("#diceTable").append(`
        <div>
            <span>${this.value}</span>
        </div>
    `);
  }
}

$("#btnBar").click(() => {
  let die = new Die();
  die.roll();
  die.create();
});

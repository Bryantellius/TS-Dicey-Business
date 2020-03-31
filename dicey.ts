import $ from "jquery";
let date = {
  month: new Date().getUTCMonth() + 1,
  day: new Date().getUTCDate(),
  year: new Date().getUTCFullYear()
};
let count = 0;
let dieArr: Array<Die> = [];

class Die {
  id: number;
  value: number;
  dieBody: JQuery<HTMLElement>;
  constructor(id: number) {
    this.id = id;
    this.value = 0;
    this.dieBody = $(`<div></div>`);
  }

  roll() {
    this.value = Math.floor(Math.random() * 6) + 1;
  }

  create() {
    this.dieBody = $(`
    <div id="${this.id}" class="die bg-dark text-light rounded shadow m-2 text-center">
        ${this.value}
    </div>`);
    $(this.dieBody).click(() => {
      this.roll();
      this.update();
    });
    $(this.dieBody).dblclick(() => this.delete());
    $("#diceTable").append(this.dieBody);
  }

  update() {
    $(this.dieBody).text(this.value);
  }

  delete() {
    $(`#${this.id}`).remove();
    dieArr = dieArr.filter(die => !(die.id === this.id));
  }
}

$("#date").text(`${date.month}/${date.day}/${date.year}`);

$("#addBtn").click(() => {
  let die = new Die(count);
  die.roll();
  die.create();
  dieArr.push(die);
  count++;
});

$("#rollBtn").click(() => {
  dieArr.forEach(die => {
    die.roll();
    die.update();
  });
});

$("#sumBtn").click(() => {
  let sum: number = 0;
  dieArr.map(die => {
    sum += die.value;
  });
  $("#sum").text(`Sum: ${sum}`);
});

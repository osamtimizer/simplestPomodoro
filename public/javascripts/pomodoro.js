import $ from 'jquery';

var remain = 60 * 25 * 1000;
var interval = 60 * 5 * 1000;
var timer;

$(() => {
  $("button.start").click((event) => {
    timer = setInterval(startCount, 1000);
    $("button.start").prop("disabled", true);
  });

  $("button.stop").click((event) => {
    $("button.start").prop("disabled", false);
    clearInterval(timer);
  });
});

const startCount = () => {
  remain = remain - 1000;
  $("p.time").text(new Date(remain).toISOString().slice(14, -5));
};

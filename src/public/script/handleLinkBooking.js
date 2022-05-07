let formatDate = (date) => {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
  
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
  
    return [year, month, day].join("-");
};

let prevHref = $("#detail-booking").attr("href");

$("#detail-booking").attr(
"href",
`${prevHref}?date=${formatDate(new Date().toString())}`
);

var moment = require('moment');

module.exports = {
<<<<<<< HEAD
  mergeName: (a, b) => a + ' ' + b,
  convertDate: (a) => moment(a).format('YYYY-MM-DD'),
  nonImage: (a) => (a == 'undefined' ? 'nonimage.png' : a),
  disabled: (a) => {
    if (a == 1) return 'disabled';
=======
  mergeName: (a, b) => a + " " + b,
  convertDate: (a) => moment(a).format("YYYY-MM-DD"),
  nonImage: (a) => (a == "undefined" ? "nonimage.png" : a),
  hidden: (a) => {
    if (a == 1) return "hidden";
>>>>>>> ba0462c (feat: account management final)
  },
  deleteSpace: (a) => a.trim(),
  emotionReact: (a) => {
    if (a == 3) {
      return 'haha-react.png';
    } else if (a == 1) {
      return 'red-heart_2764-fe0f.png';
    } else if (a == 2) {
      return 'like-react.png';
    } else if (a == 3) {
      return 'haha-react.png';
    } else if (a == 4) {
      return 'angry-icon.png';
    } else if (a == 5) {
      return 'lovelove-icon.png';
    } else if (a == 6) {
      return 'cry-icon.png';
    } else {
      return 'white-heart.png';
    }
  },
  converDateNewsfeed: (a) => moment(a).format('LLL'),
  iconRulePost: (a) => (a == 1 ? 'world-icon.png' : 'locked-icon.png'),
  sum: (a) => (a == a ? a + 1 : a), //create helpers
  convertGender: (a) => (a == 1 ? 'Nam' : 'Nữ'),
  status: (a) => {
    if (a == 1) return 'Hoạt động';
    if (a == 0) return 'Khóa';
    if (a == 2) return 'Bận';
  },
  followCustomer: (a) => (a == 1 ? 'unfollow' : 'follow'),
  followGroup: (a) => (a == 1 ? 'leave' : 'join'),
  btnStatus: (a) => {
<<<<<<< HEAD
    if (a == 1) return 'check';
    if (a == 0) return 'block';
    if (a == 2) return 'remove';
=======
    if (a == 1) return "check";
    if (a == 0) return "close";
    if (a == 2) return "remove";
>>>>>>> ba0462c (feat: account management final)
  },
  checked: (a, b) => {
    if (a == b) return 'checked';
  },
<<<<<<< HEAD
  btnStatusHidden: (a) => (a == 1 ? 'btn-status--hidden' : ''),
=======
  gender: (a, b) => {
    if (a == b) return "checked";
  },
  btnStatusHidden: (a) => (a == 1 ? "btn-status--hidden" : ""),
>>>>>>> ba0462c (feat: account management final)
  accType: (a) => {
    if (a == 1) return 'Quản trị viên';
    else if (a == 2) return 'Bác sĩ';
    else if (a == 3) return 'Người dùng';
  },
  sortable: (field, sort) => {
    const sortType = field == sort.column ? sort.type : 'default';
    const icons = {
      default: 'fas fa-sort',
      desc: 'fas fa-sort-amount-down',
      asc: 'fas fa-sort-amount-up',
    };

    const types = {
      default: 'desc',
      asc: 'desc',
      desc: 'asc',
    };
    const icon = icons[sortType];
    const type = types[sortType];
    return `<a href="?_sort&column=${field}&type=${type}">
          <i class="${icon}"></i>
        </a>`;
  },
  formatCurrency: (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(Number(price));
  },

  formatLongString: (str) => {
    return str.length > 10 ? str.slice(0, 9).concat('...') : str;
  },

  emitCardTitle: (str) => {
    return str.length > 40 ? str.slice(0, 40).concat('...') : str;
  },

  displayPromotion: (per) => {
    return per != 0 ? per + '% off' : '';
  },

  displayStarNo: (starNo) => {
    let stars = '';
    for (let i = 0; i < starNo; i++) stars += 'star ';
    return stars;
  },
  trueSelected: (value) => {
    return value === 1 ? 'selected' : '';
  },
  falseSelected: (value) => {
    return value === 0 ? 'selected' : '';
  },

  displayStarNo: (starNo) => {
    let stars = ``;
    for (let i = 0; i < starNo; i++) stars += `⭐`;
    return stars;
  },

  formatTime: (time) => {
    const times = time.split(':');
    return `${times[0]}:${times[1]}`;
  },
};

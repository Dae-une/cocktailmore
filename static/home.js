const $descending = document.querySelector(".descending");

$descending.addEventListener("click", (e) => {
  if (!e.target.classList.contains("active")) {
    e.target.innerText = "오름차순";
    $(".card-group").empty();
    $.ajax({
      type: "get",
      dataType: "json",
      url: "https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Cocktail_glass",
      data: {},
      success: function (result) {
        let rows = result.drinks;
        console.log(rows);
        for (let i = 0; i < rows.length; i++) {
          let ckname = rows[i].strDrink;
          let img = rows[i].strDrinkThumb;
          let html_temp = `<div class="card">
                                            <img src="${img}/preview" class="card-img-top" alt="...">
                                            <div class="card-body">
                                              <h5 class="card-title">${ckname}</h5>
                                            </div>
                                            <div class='bottomBox'>
                                                <input type="text" class="commentBox${i}" placeholder="댓글을 입력하세요 !">
                                                <button class="inputBtn" onclick="save_comment(${i})">입력</button>
                                                <button class="spreadBtn${i}" onclick="spread(${i})" id="rightBtn${i}"><i class="fa-solid fa-arrow-down"></i></button>
                                            </div>
                                            <ul class="commentList ${i}" id="commentList${i}">
                                                <li>김철수 : 짱짱 !</li>
                                                <li>박종철 : 맛있어요 !</li>
                                                <li>신윤섭 : 부드러워요 !</li>
                                            </ul>
                                         </div>`;
          $(".card-group").prepend(html_temp);
        }
      },
    });
    e.target.classList.add("active");
  } else {
    $(".card-group").empty();
    e.target.innerText = "내림차순";
    $.ajax({
      type: "get",
      dataType: "json",
      url: "https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Cocktail_glass",
      data: {},
      success: function (result) {
        let rows = result.drinks;
        for (let i = 0; i < rows.length; i++) {
          let ckname = rows[i].strDrink;
          let img = rows[i].strDrinkThumb;
          let html_temp = `<div class="card">
                                            <img src="${img}/preview" class="card-img-top" alt="...">
                                            <div class="card-body">
                                              <h5 class="card-title">${ckname}</h5>
                                            </div>
                                            <div class='bottomBox'>
                                                <input type="text" class="commentBox${i}" placeholder="댓글을 입력하세요 !">
                                                <button class="inputBtn" onclick="save_comment(${i})">입력</button>
                                                <button class="spreadBtn${i}" onclick="spread(${i})" id="rightBtn${i}"><i class="fa-solid fa-arrow-down"></i></button>
                                            </div>
                                            <ul class="commentList ${i}" id="commentList${i}">
                                                <li>김철수 : 짱짱 !</li>
                                                <li>박종철 : 맛있어요 !</li>
                                                <li>신윤섭 : 부드러워요 !</li>
                                            </ul>
                                         </div>`;
          $(".card-group").append(html_temp);
        }
      },
    });
    e.target.classList.remove("active");
  }
});

$.ajax({
  type: "get",
  dataType: "json",
  url: "https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Cocktail_glass",
  data: {},
  success: function (result) {
    let rows = result.drinks;
    for (let i = 0; i < rows.length; i++) {
      let ckname = rows[i].strDrink;
      let img = rows[i].strDrinkThumb;
      let html_temp = `<div class="card">
                                        <a href="/review/${rows[i].idDrink}">
                                        <img src="${img}/preview" class="card-img-top">
                                        </a>
                                        <div class="card-body">
                                          <h5 class="card-title">${ckname}</h5>
                                        </div>
                                        <div class='bottomBox'>
                                            <button class="spreadBtn${i}" onclick="spread(${i})" id="rightBtn${i}"><i class="fa-solid fa-arrow-down"></i></button>
                                        </div>
                                        <ul class="commentList ${i}" id="commentList${i}">
                                        </ul>
                                     </div>`;
      $(".card-group").append(html_temp);
    }
  },
});

function save_comment(index) {

    let comment = $(`.commentBox${index}`).val();
    let nick = $('.myNickName').text()
    if (comment === '') {
        alert('댓글을 입력해 주세요!')
        return
    } else {
        $.ajax({
            type: "POST",
            url: "/cocktail",
            data: {comment_give: comment, index_give: index, nick_give: nick},
            success: function (response) {
                alert(response["msg"])
                window.location.reload()
            }
        });
    }

}

function moveDetailPage() {
    window.location.href = 'https://www.google.com/'
}

function spread(index) {
    let commentArea = `<input type="text" class="commentBox${index}" placeholder="댓글을 입력하세요 !">
                       <button class="inputBtn" onclick="save_comment(${index})">입력</button>`
    let moreCommentBtn = `<li><button class='moreCommentBtn' onclick='moveDetailPage()'><i class="fa-solid fa-ellipsis"></i></button></li>`
    $(`.${index}`).empty()

    $(`.${index}`).append(commentArea)
    $.ajax({
        type: "get",
        url: "/cocktail",
        success: function (result) {
            let reviewList = [];
            let rows = result['comment'];
            console.log(rows);
            rows.forEach((item) => {
                let text = `<li>${item['nick']}: ${item['comment']}</li>`
                if (item['index'] == index) {
                    reviewList.push(text);
                }
            })
            let cuReview = reviewList.slice(-5).reverse();
            $(`.${index}`).append(cuReview);
            $(`.${index}`).append(moreCommentBtn)
            // console.log(rows[0]['index']);
            // console.log(rows['comment']);
            // rows.forEach()
        },

  let comment = $(`.commentBox${index}`).val();
  if (comment === "") {
    alert("댓글을 입력해 주세요!");
    return;
  } else {
    $.ajax({
      type: "POST",
      url: "/cocktail",
      data: { comment_give: comment, index_give: index },
      success: function (response) {
        alert(response["msg"]);
        window.location.reload();
      },

    });
  }
}


    const id = document.querySelector(`#rightBtn${index}`)
    if (id.className == `spreadBtn${index}`) {
        $(`.${index}`).show();
        id.setAttribute('class', `closeBtn${index}`)
    } else if (id.className == `closeBtn${index}`) {
        $(`.${index}`).hide();
        id.setAttribute('class', `spreadBtn${index}`)
    }

function spread(index) {
  $(`.${index}`).empty();
  $.ajax({
    type: "get",
    url: "/cocktail",
    success: function (result) {
      let rows = result["comment"];
      rows.forEach((item) => {
        let text = `<li>${item["comment"]}</li>`;
        if (item["index"] == index) {
          $(`.${index}`).append(text);
        }
      });
      // console.log(rows[0]['index']);
      // console.log(rows['comment']);
      // rows.forEach()
    },
  });


  const id = document.querySelector(`#rightBtn${index}`);
  if (id.className == `spreadBtn${index}`) {
    $(`.${index}`).show();
    id.setAttribute("class", `closeBtn${index}`);
  } else if (id.className == `closeBtn${index}`) {
    $(`.${index}`).hide();
    id.setAttribute("class", `spreadBtn${index}`);
  }
}

function filter() {
  let search = document.getElementById("search").value.toLowerCase();
  // console.log(search);
  let list = document.getElementsByClassName("card");
  // console.log(list);
  for (let i = 0; i < list.length; i++) {
    let searchname = list[i];
    if (searchname.innerText.toLowerCase().includes(search)) {
      list[i].style.display = "block";
    } else {
      list[i].style.display = "none";
    }
  }
}

// 리스트 세로 정렬
$(".listItem").css("line-height", $("#listRow").css("height"));

var viewSize;
var pos;

//페이지에 들어올 때 사용자 화면의 크기에 맞게 조절
$(document).ready(function(){
  console.log("test");
  sizing();
});

//사용자가 브라우저의 크기를 변경할 경우
$(window).resize(function(){
  console.log("가능!?");
  sizing();
});

$(".listItem").on("click", function(){
  console.log("슬라이드 테스트")
  pos = $(this).data("no");

  $("#mainContents").animate({
			marginLeft : viewSize * pos * -1
		});

});

//메인 컨텐츠들의 화면 크기를 정해주는 함수
function sizing(){
  viewSize = Number($("#mainContainer").css("width").split('px')[0])
  $("#mainContents").css("width", viewSize*4);

  var target = $(".contentSize");

  for(var i = 0; i < target.length; i++){
    target.eq(i).css("width", viewSize);
  }

  $("#mainContents").css("margin-left", viewSize * pos * -1);
}

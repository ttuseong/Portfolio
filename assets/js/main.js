//각 메뉴들이 이동할 크기
var viewSize;
//바의 크기, 한칸당 이동할 거리로 사용
var barSize;
//현재 위치
var pos;
//교육 내용들의 크기
var eduList=[];

// 리스트 세로 정렬
$(".listItem").css("line-height", $("#listRow").css("height"));

//페이지에 들어올 때 사용자 화면의 크기에 맞게 조절
$(document).ready(function(){
  sizing();
  educateListInit();
});

//사용자가 브라우저의 크기를 변경할 경우
$(window).resize(function(){
  sizing();
});

//메뉴클릭
$(".listItem").on("click", function(){
  pos = $(this).data("no");

  $("#mainContents").animate({
		marginLeft : viewSize * pos * -1
	});

  $("#bar").animate({
    marginLeft : barSize * pos * 1
  });
});

//메인 컨텐츠들의 화면 크기를 정해주는 함수
function sizing(){
  viewSize = Number($("#mainContainer").css("width").split('px')[0]);
  barSize = Number($("#bar").css("width").split('px')[0]);

  $("#mainContents").css("width", viewSize*4);

  var target = $(".contentSize");

  for(var i = 0; i < target.length; i++){
    target.eq(i).css("width", viewSize);
  }

  $("#mainContents").css("margin-left", viewSize * pos * -1);
  $("#bar").css("margin-left", barSize * pos * 1);
}

function educateListInit(){
  var length = $(".educateList").length;

  for(var i = 0; i < length; i++){
    eduList.push(Number($(".educateList").eq(i).css("height").split('px')[0]));
    $(".educateList").eq(i).css("height", 0);
    $(".educateList").eq(i).data("no", i);
  }

  console.log(eduList);
}

//교육 내용
$(".educateBtn").on("click", function(){
  var target = $(this).next();

  if(target.css("height").split('px')[0] == 0){
    var index = target.data("no");

    target.animate({
      height : eduList[index]
    });
  } else{
    target.animate({
      height : 0
    });
  }
});

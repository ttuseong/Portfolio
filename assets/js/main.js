//각 메뉴들이 이동할 크기
var viewSize;
//바의 크기, 한칸당 이동할 거리로 사용
var barSize;
//현재 위치
var pos = 0;
//교육 내용들의 크기
var eduList=[];
//사이즈가 767보다 작아서 메인의 높이를 조절할 필요학 있는지 확인하는 변수
var isSmall = false;

// 리스트 세로 정렬
$(".listItem").css("line-height", $("#listRow").css("height"));

//페이지에 들어올 때 사용자 화면의 크기에 맞게 조절
$(document).ready(function(){
  smallCheck();
  sizing();
  educateListInit();
});

//사용자가 브라우저의 크기를 변경할 경우
$(window).resize(function(){
  sizing();
  smallCheck();
});

$(".educateList").resize(function(){
  console.log("test");
})

//메뉴클릭
$(".listItem").on("click", function(){
  pos = $(this).data("no");

  if(isSmall){
    $("#mainContainer").height($(".contentSize").eq(pos).height());
  }

  $("#mainContents").animate({
		marginLeft : viewSize * pos * -1
	});

  $("#bar").animate({
    marginLeft : barSize * pos * 1
  });
});

//메인 컨텐츠들의 화면 크기를 정해주는 함수
function sizing(){
  viewSize = $("#mainContainer").width();
  barSize = $("#bar").width();

  $("#mainContents").css("width", viewSize*4);

  var target = $(".contentSize");

  for(var i = 0; i < target.length; i++){
    target.eq(i).css("width", viewSize);
  }

  $("#mainContents").css("margin-left", viewSize * pos * -1);
  $("#bar").css("margin-left", barSize * pos * 1);
}

//반응형으로 사용하기 위해 값을 변경시키니는 구간
function smallCheck(){
  if($("body").width() <= 990){
    isSmall = true;

    $("#mainView").height("100%");
    $("#myContainer").height("100%");
    $("#timeline").css("overflow", "auto");
    $(".contentSize").css("overflow", "auto");
    $(".contentSize").height("auto");
    $("#mainContainer").height($(".contentSize").eq(pos).height());
  } else {
    isSmall = false;

    $("#mainView").height("100vh");
    $("#myContainer").height("100vh");
    $("#timeline").css("overflow", "scroll");
    $(".contentSize").css("overflow", "scroll");
    $(".contentSize").height("100%");
    $("#mainContainer").height("95%");
  }
}

function educateListInit(){
  var length = $(".educateList").length;

  for(var i = 0; i < length; i++){
    eduList.push(Number($(".educateList").eq(i).css("height").split('px')[0]));
    $(".educateList").eq(i).css("height", 0);
    $(".educateList").eq(i).data("no", i);
  }
}

//교육 내용 슬라이드
$(".educateBtn").on("click", function(){
  var target = $(this).next();
  var index = target.data("no");

  if(target.height() == 0){
    changeHeight(index, true);

    target.animate({
      height : eduList[index]
    });
  } else{
    changeHeight(index, false);

    target.animate({
      height : 0
    });
  }
});

//교육 내용을 확인할 때 컨텐츠의 높이 값도 커지게 하는 함
function changeHeight(index, isOpen){
  var currentHeight = $(".contentSize").eq(pos).height();
  if(isSmall){
    if(isOpen){
      currentHeight += eduList[index];
    } else{
      currentHeight -= eduList[index];
    }

    $("#mainContainer").animate({
      height : currentHeight
    });
  }
}

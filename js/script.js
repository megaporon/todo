$(function(){
	// めもボタン
	var $memoBtn = $('#todoPost');
	// 終わったボタン
	var $compBtn = $('#comp');
	// 削除ボタン
	var $delBtn = $('#del');
	// 削除時に必要
	var counter=0;
	// todoを表示させるdiv
	var $output = $('#output');

	// ローカルストレージに保存しているものを取得		
	var initGetTodo = localStorage.getItem("test_key");
	var initGettodo_array = JSON.parse(initGetTodo);

	// 初期表示
	// gettodoがnullじゃなければ(あれば。空のときにnullが返ってくる場合)
	if(initGetTodo) {
		for (var i = 0; i < initGettodo_array.length; i++) {
			todo_show(initGettodo_array[i].todo_txt,$output);
			counter++;
		}
	}

	// todoを描画
	function todo_show(owa,owawa) {
		var values = {
			todo: owa
		};
		template = Handlebars.compile($('#input').html());

		var className = '';
			if (owa.finish_flg && owa.delete_flg){
				className = 'class="finish delete"'; 
			} else if(owa.finish_flg) {
				className = 'class="finish"';
			} else if(owa.delete_flg) {
				className = 'class="delete"';
			}

	
		owawa.prepend(template(values));

	}

	// メモボタンを押したら実行
	$memoBtn.click(function(){

		// 入力されたtodo
		var $todoTxt = $('#todo').val();
		console.log($todoTxt);

		// ローカルストレージに保存
		var getTodo = localStorage.getItem("test_key");
		var getTodo_array =  JSON.parse(getTodo);

		if(getTodo) {
			// todoを保存する配列
			var todoArray = getTodo_array;
		} else {
			var todoArray = [];
		}

		counter++;

		// todo-numを更新
		// var $todo_check_num = $(this).find('input').data('todo-num');
		// console.log('$todo_check_num',$todo_check_num);
		// $(this).find('input').data('todo-num').attr('todo-num', counter);
		var numa = $('#aaa').data('todo-num').eq();
		console.log('numa',numa);
		// console.log($('#aaa').data('name'));
		// $('#aaa').attr('todo-num', counter);
		// $todo_check_num = counter;



		var todo_obj = {
			number: counter,
			todo_txt: $todoTxt,
			finish_flg: false,
			delete_flg: false
		}

		todoArray.push(todo_obj);
		var todo_str = JSON.stringify(todoArray);
		localStorage.setItem("test_key",todo_str);


		todo_show($todoTxt,$output);
		// var values = {
		// 	todo: $todoTxt
		// };
		// template = Handlebars.compile($('#input').html());

	
		// $output.prepend(template(values));
		$todoTxt = $('#todo').val('');
	});


	// おわーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
	// チェックボックスにチェックするとis-checkedというクラスを付ける（付け外しをする）
		function todoClick() {
			var $checkColum = $(this).parent();
			$checkColum.toggleClass('is-checked');
		}

		// チェックしたらtodoClickを呼ぶ
		$(document).on('click', '.js-todo-check', todoClick);

		var comp = function() {
			// .is-checkedがついているものをdelElmに代入
			var $delElm = $output.find('.is-checked');
			// propでチェックボックスを強制的にfalse（チェックを外した状態）にしている
			$output.find('.js-todo-check').prop('checked',false);
			$delElm.toggleClass('finish').removeClass('is-checked');

			// ストレージのフラグ更新

			// チェックしているもの(delElm)を配列から探す
			// eachは条件に当てはまるもののみ繰り返す
			$delElm.each(function(index,elm){
				// index = 配列の添字（[]の中の数字）
				// elm = delElm[index];
				// console.log(elm);
				// console.log($delElm[index]);
				// thisにはelmが入ってる
				// console.log(this === elm);

				// .findはjQueryのなのでthisとか使うときは$()する
				var $todo_check_num = $(this).find('input').data('todo-num');
				// console.log('$todo_check_num',$todo_check_num);
				// $todo_check_num = 1;

				// 配列分繰り返す
				for (var i = 0; i < initGettodo_array.length; i++) {
					if($todo_check_num == i+1) {
						initGettodo_array[i].finish_flg = true;
						var todo_true = JSON.stringify(initGettodo_array);
						localStorage.setItem("test_key",todo_true);
					} else {	
					}
				}
			});
		}

		// 非表示にする
		var del = function() {
			var $delElm2 = $output.find('.is-checked');
			$delElm2.hide();
			$delElm2.each(function(index,elm){
				// index = 配列の添字（[]の中の数字）
				// elm = delElm[index];
				// console.log(elm);

				// .findはjQueryのなのでthisとか使うときは$()する
				var $todo_check_num = $(this).find('#aaa').data('todo-num');

				// 配列分繰り返す
				for (var i = 0; i < initGettodo_array.length; i++) {
					if($todo_check_num == i+1) {
						initGettodo_array[i].delete_flg = true;
						var todo_true = JSON.stringify(initGettodo_array);
						localStorage.setItem("test_key",todo_true);
					} else {	
					}
				}
			});
		}	
		// 終わったボタンおしたらcomp()を実行
		$compBtn.on('click', comp);
		// 削除ボタンおしたらdel()を実行
		$delBtn.on('click', del);
});

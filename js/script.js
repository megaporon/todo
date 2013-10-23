(function() {
	document.addEventListener('DOMContentLoaded', function() {
		// めもボタンを取得
		var $memoBtn = $('#todoPost');
		// 終わったボタンを取得
		var $compBtn = $('#comp');
		// 削除ボタンを取得
		var $delBtn = $('#del');
		// 削除時に必要
		var counter=0;
		// 文字を表示させるdiv.todoAreaを取得
		var $todoArea = $('#todoArea');


		// ローカルストレージに保存しているものを取得		
		var initGetTodo = localStorage.getItem("test_key");
		var initGettodo_array = JSON.parse(initGetTodo);

		// gettodoがnullじゃなければ(あれば。空のときにnullが返ってくる場合)
		if(initGetTodo) {
			// 初期表示ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
			for (var i = 0; i < initGettodo_array.length; i++) {
				todoShow(initGettodo_array[i],$todoArea);
				counter++;
			}
			// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
		}


		/*———————————–*/
		// いっかいリロードせなflgこうしんされん......
		/*———————————–*/

		// todoを描画するfunction
		function todoShow(todo,todoSpace) {
			var className = '';
			if (todo.finish_flg && todo.delete_flg){
				className = 'class="finish delete"'; 
			} else if(todo.finish_flg) {
				className = 'class="finish"';
			} else if(todo.delete_flg) {
				className = 'class="delete"';
			}
			todoSpace.prepend('<p '+ className +'>' + todo.todo_txt + '<input data-todo-num="' + todo.number + '" type="checkbox" class="js-todo-check" id="todo_check" value="" /></p>');
		}


		var todoMemo = 　function() {
			// 入力フォームtodoを取得
			var $todo = $('#todo').val();
			// 文字を入れるpを作る
			var $todoBox = $('<p></p>');
			// p(todoBox)に.todoListをセット
			$todoBox.addClass('todoList');

			var getTodo = localStorage.getItem("test_key");
			var getTodo_array = JSON.parse(getTodo);
			
			if(getTodo) {
				// todoを保存する配列
				var todoArray = getTodo_array;
			}else {
				// todoを保存する配列
				var todoArray = [];
			}

			counter++;
			
			var todo_obj = {
				number: counter,
				todo_txt: $todo,
				finish_flg: false,
				delete_flg: false
			};
			todoShow(todo_obj,$todoBox);
			todoArray.push(todo_obj);
			var todo_str = JSON.stringify(todoArray);
			localStorage.setItem("test_key",todo_str);

			// div($todoArea)に文字が入ったp(todoBox)を入れて表示
			$todoArea.prepend($todoBox);
			// 入力されている文字をクリア
			var $todo = $('#todo').val('');
			location.reload();
		}


		$memoBtn.on('click', todoMemo);

		// チェックボックスにチェックするとis-checkedというクラスを付ける（付け外しをする）
		function todoClick() {
			var $checkColum = $(this).parent();
			$checkColum.toggleClass('is-checked');
		}

		// チェックしたらtodoClickを呼ぶ
		$(document).on('click', '.js-todo-check', todoClick);

		var comp = function() {
			// .is-checkedがついているものをdelElmに代入
			var $delElm = $todoArea.find('.is-checked');
			// propでチェックボックスを強制的にfalse（チェックを外した状態）にしている
			$todoArea.find('.js-todo-check').prop('checked',false);
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
			var $delElm2 = $todoArea.find('.is-checked');
			$delElm2.hide();
			$delElm2.each(function(index,elm){
				// index = 配列の添字（[]の中の数字）
				// elm = delElm[index];
				// console.log(elm);

				// .findはjQueryのなのでthisとか使うときは$()する
				var $todo_check_num = $(this).find('input').data('todo-num');

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

	}, false);
})();






(function(angular) {
	'use strict';

	//应用程序的主要模块
	var myApp = angular.module("MyToDoMvc", ["ngRoute"]);

	//注册一个控制器
	myApp.controller("MainController", ["$scope", "$location", function($scope, $location) {

		//文本框的模型
		$scope.text = "";

		//任务列表也需要一个
		$scope.works = [{
				id: 1,
				text: "学习",
				completed: true
			},
			{
				id: 2,
				text: "玩游戏",
				completed: false
			},
			{
				id: 3,
				text: "睡觉",
				completed: true
			}
		];

		//获取ID，防止添加删除的时候会有问题
		function getID() {
			var id = Math.random();
			for(var i = 0; i < $scope.works.length; i++) {
				if($scope.works[i].id === id) {
					id = getID();
					break;
				}
			}
			return id;
		}
		//添加操作
		$scope.add = function() {
			if($scope.text != "") {
				$scope.works.push({
					id: getID(),
					text: $scope.text,
					completed: false
				});
			} else {
				alert("请输入文字");
			}

			//清空文本框
			$scope.text = "";
		}

		//删除操作
		$scope.remove = function(id) {
			for(var i = 0; i < $scope.works.length; i++) {
				if($scope.works[i].id === id) {
					$scope.works.splice(i, 1);
					break;
				}
			}
		}

		//删除所有完成元素
		$scope.clear = function() {
			var result = [];
			for(var i = 0; i < $scope.works.length; i++) {
				if(!$scope.works[i].completed) {
					result.push($scope.works[i]);
				}
			}
			$scope.works = result;
		}

		//显示有完成的工作
		$scope.existCompleted = function() {
			for(var i = 0; i < $scope.works.length; i++) {
				if($scope.works[i].completed) {
					return true;
				}
			}
			return false;
		}

		//当前编辑的元素
		$scope.currentEditingID = -1;
		$scope.editing = function(id, completed) {
			for(var i = 0; i < $scope.works.length; i++) {
				if(!completed) {
					$scope.currentEditingID = id;
					break;
				}
			}
		}
		$scope.save = function(id) {
			$scope.currentEditingID = -1;
		}

		//全选按钮
		var now = false;
		$scope.toggleAll = function() {
			for(var i = 0; i < $scope.works.length; i++) {
				$scope.works[i].completed = now;
			}
			now = !now;
		}

		//状态筛选
		$scope.selector = {};

		$scope.$location = $location;
		//watch只能监视属于$scope的成员
		$scope.$watch('$location.hash()', function(now, old) {
			switch(now) {
				case '/active':
					$scope.selector = {
						completed: false
					};
					break;
				case '/completed':
					$scope.selector = {
						completed: true
					};
					break;
				default:
					$scope.selector = {};
					break;
			}
		});

	}]);
})(angular);
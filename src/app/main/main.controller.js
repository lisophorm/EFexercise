(function () {
  'use strict';

  angular
    .module('efproject')
    .controller('MainController', MainController)
    .controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, season) {

      var selectedSeason = season;
      var selectedCampus = 0;

      //$('modal-dialog').fadeOut(0);

      setTimeout(function () {
        $('modal-dialog').fadeIn();
        var height = $(window).height() - $('.modal-header').height() - $('.modal-footer').height()-45;
        $(".modal-body").css('max-height', height + 'px');
      }, 500);


      if (season == 'june') {
        $scope.moduleName = "Module D";
      } else {
        $scope.moduleName = "Module E";
      }

      $scope.selectRotation = function (campus) {
        $uibModalInstance.close({
          season: selectedSeason,
          campus: campus
        });
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };
    });

  /** @ngInject */
  function MainController($uibModal, $scope) {

    $scope.items = ['item1', 'item2', 'item3'];

    var vm = this;

    vm.headerAugust = "rotation-bg-7";
    vm.headerJune = "rotation-bg-7";

    vm.emptyRotationJune = "assets/images/rotation_7.png";
    vm.emptyRotationAugust = "assets/images/rotation_7.png";

    console.log('main controller');

    vm.openModal = function (season) {

      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/templates/rotation-modal.html',
        controller: 'ModalInstanceCtrl',
        resolve: {
          season: function () {
            return season;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        if (selectedItem.season == 'june') {
          //$scope.$apply(function () {
          vm.headerJune = "rotation-bg-" + selectedItem.campus;
          vm.emptyRotationJune = "assets/images/rotation_"+ selectedItem.campus+".png";
          //});

        } else {
          //$scope.$apply(function () {
          vm.headerAugust = "rotation-bg-" + selectedItem.campus;
          vm.emptyRotationAugust = "assets/images/rotation_"+ selectedItem.campus+".png";
          //});

        }
        console.log('modal closed');
        console.log(selectedItem);

      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });
    };


  }
})();

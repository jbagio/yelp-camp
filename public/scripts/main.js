$(document).ready(function () {
  // flash-messages close btn
  $(".flash-messages a").click(function () {
    $(".flash-messages").fadeOut("slow");
  });

// ==================== jquery-validation ==================== //
// to use require_from_group https://jqueryvalidation.org/require_from_group-method/
// TODO: revive if/when alternative external image url implemented
// ==================== jquery-validation ==================== //

  // Set jQuery.validate settings for bootstrap integration
  // jQuery.validator.setDefaults({
  //   highlight: function (element) {
  //     jQuery(element).closest('.form-group').addClass('has-error');
  //   },
  //   unhighlight: function (element) {
  //     jQuery(element).closest('.form-group').removeClass('has-error');
  //   },
  //   errorElement: 'span',
  //   errorClass: 'label label-danger',
  //   errorPlacement: function (error, element) {
  //     if (element.parent('.input-group').length) {
  //       error.insertAfter(element.parent());
  //     } else {
  //       error.insertAfter(element);
  //     }
  //   }
  // });

  // custom rule to ensure that either image url or image file are selected
  // $("#new-campground-form").validate({
  //   rules: {
  //     imageLocal: {
  //       require_from_group: [1, ".image-group"]
  //     },
  //     imageExternal: {
  //       require_from_group: [1, ".image-group"]
  //     }
  //   }
  // });
  // $("#edit-campground-form").validate({
  //   rules: {
  //     imageLocal: {
  //       require_from_group: [1, ".image-group"]
  //     },
  //     imageExternal: {
  //       require_from_group: [1, ".image-group"]
  //     }
  //   }
  // });
});
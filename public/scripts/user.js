
$(window).on('load', function () {
    $('spinner-border').hide();
    $('#userForm').validate({
        errorClass: "text-danger",
        errorElement: "span",
    });
    $('[data-validate="salary"]').each(function () {
        jQuery.validator.addMethod(
            "negativeNumber",
            function (value, element) {
                if (value <= 0) {
                    return false;
                } else {
                    return true;
                }
            },
            ""
        );
        $(this).rules("add", {
            number: true,
            negativeNumber: true,
            messages: {
                required: "This field is required", // can't have text
                negativeNumber: "Invalid Input"
            }
        });
    })
})



$(document).ready(function () {

    $(".error_salary").hide();
    $('.spinner-border').hide();

    $(".search").on("click", () => {

        let salary = $("input[name = 'salary']").val();
        let sign = $('#user_search option:selected').val();
        if (salary === "") {
            $(".error_salary").show().html("This field is required");
        }
        if (salary !== "" && salary <= 0) {
            $(".error_salary").show().html("Invalid Input");
        }

        if (salary && salary > 0) {

            $.ajax({
                type: "GET",
                url: `/user/ajax?salary=${salary}&sign=${sign}`,
                beforeSend: function () {
                    $('.spinner-border').show();
                },
                dataType: "json",
                success: (resp) => {

                    $('spinner-border').hide();
                    $(".error_salary").hide();
                    let html = `
                <table class="table  mt-4 border"  width="100%">
                <thead>
                    <th>Sr No<th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Salary</th>
                </thead>
                <tbody>`;
                    if (resp && resp.length) {
                        for (let index = 0; index < resp.length; index++) {
                            const element = resp[index];
                            html += `  
                    <tr> 
                    <td>${index + 1}<td>
                    <td>${element.name}</td>
                    <td>${element.email}</td>
                    <td>${element.salary}</td>
                    </tr>
                    `;
                        }
                    }
                    else {
                        html += ` <tr><td> No Data Found</td> </tr> `
                    }

                    html += `</tbody></table>`;
                    $('.addSearch').html(html);
                }
            });
        }
    });




    $('.removeSearch').click(function () {
        $(".error_salary").hide();
        let salary = $("input[name = 'salary']").val("");
        let sign = $("#user_search :selected").val("");
    });

});
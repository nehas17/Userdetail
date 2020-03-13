const { INSERT, userDetail } = require("../model/user");
const con = require("../config/dbConfig");
const { TABLES } = require("../config/constants");
module.exports = {
    userData: {

        get: async (req, res, next) => {
            let option = {
                server_success: req.flash("server_success")[0],
                server_error: req.flash("server_error")[0],
            }
            res.render("user", option);
        },
        post: async (req, res) => {
            let { email, name, salary } = req.body;
            if (!req.form.isValid) {
                req.flash('server_error', ` ${req.form.getErrors()}`)
                return res.redirect('/')
            } else {
                try {
                    await INSERT(con, TABLES.USER, {
                        email,
                        name,
                        salary
                    });
                    req.flash('server_success', "User Detail Added Successfully!!")
                    return res.redirect('/')

                } catch (error) {
                    req.flash('server_error', error.message)
                    return res.redirect('/')

                }
            }
        }
    },
    userSearch: {
        get: async (req, res, next) => {
            let option = {
                server_success: req.flash("server_success")[0],
                server_error: req.flash("server_error")[0],
                sign: [
                    {
                        label: "Less Than Equal To",
                        value: "<="
                    },
                    {
                        label: "Greater Than Equal To",
                        value: ">="
                    },
                ]
            }
            res.render("search", option);
        },
        ajax: async (req, res) => {
            let { sign, salary } = req.query;
            let response;
            let filterData = {
                sign,
                salary
            };

            try {
                response = await userDetail(con, filterData);
            } catch (error) {
                req.flash('server_error', error.message)
                return res.redirect('/search-user')
            }
            return res.send(response);
        }
    }
}

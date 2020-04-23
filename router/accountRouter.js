const express = require("express")
const db = require("../data/dbConfig.js");
const router = express.Router();


// GET ALL ACCOUNTS
router.get("/", async(req, res, next) => {
    const { limit, sortby, sortdir } = req.query
  
    
    if (limit || sortby || sortdir) {
        const queried = await db.select("*").from("accounts").limit(limit).orderBy(sortby, sortdir)
        res.json(queried)
    }
    else {
    try {
        const accounts = await db.select("*").from("accounts")
        res.json(accounts)
    }
    catch (err) {
        next(err)
    }
}
})

// GET ACCOUNT BY ID
router.get("/:id", async(req, res, next) => {

    try {
        const account = await db("accounts").where("id", req.params.id);
        res.json(account)
    }
    catch (err) {
        next(err)
    }
})

// DELETE ACCOUNT BY ID
router.delete("/:id", async(req, res, next) => {
    const { id } = req.params

    try {
        await db("accounts").where("id", id).del()
        res.status(204).end()
    }
    catch (err) {
        next(err)
    }

})


module.exports = router
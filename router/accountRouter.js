const express = require("express")
const db = require("../data/dbConfig.js");
const router = express.Router();


// GET ALL ACCOUNTS
router.get("/", async(req, res, next) => {
    const { limit, sortby, sortdir } = req.query
    switch(limit || sortby){
        case limit :
            const queried = await db.select("*").from("accounts").limit(limit);
            res.json(queried)
        break;
        case sortby:
            const queriedSorted = await db.select("*").from("accounts").orderBy(sortby, sortdir);
            res.json(queriedSorted)
        break;
        default:
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

router.post("/", async (req, res, next) => {
    const { name, budget } = req.body
    const payload = {
        name: name,
        budget: budget,
    }

    try {
        const [id] = await db("accounts").insert(payload)
        const message = await db("accounts").where("id", id).first();
        res.json(message)
    }
    catch (err) {
        next(err)
    }

})


module.exports = router
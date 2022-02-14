const Bill = require('../models/Bill')

const Today = new Date().toISOString()

class BillController {
    async Order(req, res) {
        var bill = new Bill(req.body)
        bill.save(function (err) {
            if (!err) {
                res.send("Odered")
            }
            else {
                res.send(err)
            }
        })
    }

    getBill(req, res) {
        Bill.find({ $or: [{ Status: 'waiting to receive' }, { Status: 'Processing' }] }, function (err, data) {
            if (!err) {
                res.json(data)
            } else {
                res.status(500).json({ error: "FAIL" })
            }
        })
    }

    History(req, res) {
        Bill.find({ Status: 'ordered' }, function (err, data) {
            if (!err) {
                res.json(data)
            } else {
                res.status(500).json({ error: "FAIL" })
            }
        })
    }

    getNewBills(req, res) {
        Bill.find({ Status: 'waiting to receive' }, function (err, data) {
            if (!err) {
                res.json(data)
            } else {
                res.status(500).json({ error: "FAIL" })
            }
        })
    }

    getCanceledBills(req, res) {
        Bill.find({ Status: 'canceled' }, function (err, data) {
            if (!err) {
                res.json(data)
            } else {
                res.status(500).json({ error: "FAIL" })
            }
        })
    }

    async Update(req, res) {
        console.log(req.body)
        Bill.findOneAndUpdate({ _id: req.body.id }, { $set: { Account: req.body.Account, Name: req.body.Name, Addres: req.body.Addres, PhoneNumber: req.body.PhoneNumber, Foods: req.body.Foods, TotalPrice: req.body.TotalPrice, Status: req.body.Status, Time: req.body.Time } }, { new: true }, function (err, docs) {
            if (docs == null) {
                res.send("Update Error")
            }
            else {
                console.log(docs)
                res.send('Updated')
            }
        })
    }

    BillsToday(req, res) {
        Bill.find({ '$where': `this.Time.toJSON().slice(0, 10) == '${req.body.Time}'` } , function (err, data) {
            if (!err) {
                res.json(data)
            }
            else {
                res.status(500).json(err)
            }
        })
    }

    ThisMonthBills(req, res) {
        console.log(Today)
        Bill.find({ '$where': `this.Time.toJSON().slice(0, 7) == '${req.body.Time}'` } , function (err, data) {
            if (!err) {
                res.json(data)
            }
            else {
                res.status(500).json({ error: 'FAIL' })
            }
        })
    }

    BillsYear(req, res) {
        console.log(req.body.Time)
        Bill.find({ '$where': `this.Time.toJSON().slice(0, 4) == '${req.body.Time}'` } , function (err, data) {
            
            res.json(data)
        })
    }
}
module.exports = new BillController
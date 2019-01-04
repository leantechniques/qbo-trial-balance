var assert = require('assert');
var trialBalance = require('../index');

describe("Mapping QBO Trial Balance report object into a simplified object model", function () {
    var tb;

    beforeEach(function () {
        tb = trialBalance.map(qboTrialBalance);
    });

    it("Adds reporting period to trial balance metadata", function () {
        assert.equal('2016-03-01', tb.metadata.period.start);
        assert.equal('2016-03-14', tb.metadata.period.end);
    });

    it("Adds report timestamp to metadata", function () {
        assert.equal('2016-03-14T10:11:07-07:00', tb.metadata.timestamp);
    });

    it("Maps account information", function () {
        assert.account_details(tb.accounts[0], {
            id: 35,
            name: 'Checking',
            debit: 4151.74,
            credit: undefined
        });

        assert.account_details(tb.accounts[1], {
            id: 13,
            name: 'Meals and Entertainment',
            debit: undefined,
            credit: 46.00
        });

        assert.account_details(tb.accounts[2], {
            id: 93,
            name: 'QuickBooks Payments Fees',
            debit: 0.44,
            credit: undefined
        });
    });

    var qboTrialBalance = {
        "Header": {
            "ReportName": "TrialBalance",
            "Option": [
                {
                    "Name": "NoReportData",
                    "Value": "false"
                }
            ],
            "DateMacro": "this month-to-date",
            "ReportBasis": "Accrual",
            "StartPeriod": "2016-03-01",
            "Currency": "USD",
            "EndPeriod": "2016-03-14",
            "Time": "2016-03-14T10:11:07-07:00"
        },
        "Rows": {
            "Row": [
                {
                    "ColData": [
                        {
                            "id": "35",
                            "value": "Checking"
                        },
                        {
                            "value": "4151.74"
                        },
                        {
                            "value": ""
                        }
                    ]
                },
                {
                    "ColData": [
                        {
                            "id": "13",
                            "value": "Meals and Entertainment"
                        },
                        {
                            "value": ""
                        },
                        {
                            "value": "46.00"
                        }
                    ]
                },
                {
                    "ColData": [
                        {
                            "id": "93",
                            "value": "QuickBooks Payments Fees"
                        },
                        {
                            "value": "0.44"
                        },
                        {
                            "value": ""
                        }
                    ]
                },
                {
                    "group": "GrandTotal",
                    "type": "Section",
                    "Summary": {
                        "ColData": [
                            {
                                "value": "TOTAL"
                            },
                            {
                                "value": "36587.47"
                            },
                            {
                                "value": "36587.47"
                            }
                        ]
                    }
                }
            ]
        },
        "Columns": {
            "Column": [
                {
                    "ColType": "Account",
                    "ColTitle": ""
                },
                {
                    "ColType": "Money",
                    "ColTitle": "Debit"
                },
                {
                    "ColType": "Money",
                    "ColTitle": "Credit"
                }
            ]
        }
    }

    assert.account_details = function (actual, expected) {
        assert.equal(actual.id, expected.id);
        assert.equal(actual.name, expected.name);
        assert.equal(actual.debit, expected.debit);
        assert.equal(actual.credit, expected.credit);
    }
});
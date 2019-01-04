var _ = require('lodash');

module.exports = {
    map: function (qbo) {
        var header = qbo['Header'];

        return {
            metadata: {
                period: {
                    start: header['StartPeriod'],
                    end: header['EndPeriod']
                },
                timestamp: header['Time']
            },
            accounts: _.map(_.filter(qbo['Rows']['Row'], dataRows), accountDetails)
        };
    }
}

function dataRows(row) {
    return row['ColData'];
}

function accountDetails(row) {
    var e = row['ColData'];

    return {
        id: Number(e[0]['id']),
        name: e[0]['value'],
        debit: e[1]['value'] == '' ? undefined : Number(e[1]['value']),
        credit: e[2]['value'] == '' ? undefined : Number(e[2]['value'])
    }
}


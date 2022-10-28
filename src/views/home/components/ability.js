function abilityCheck(userType) {
    if(userType == 'owner'){
        return [ {
            action: 'manage',
            subject: 'all',
        }]
    }else if (userType == 'franchise') {
        return [
            {
                action: 'read',
                subject: 'Agent',
            },
            {
                action: 'read',
                subject: 'Franchise',
            },
            {
                action: 'read',
                subject: 'ACL',
            },
        ]
    }else{
        return[
            {
                action: 'read',
                subject: 'Agent',
            },
            {
                action: 'read',
                subject: 'ACL',
            },
        ]
    }
}

module.exports = {
    abilityCheck
}
'use strict';
/**
 * Write the unit tests for your transction processor functions here
 */

  /**
 * Initialize some test assets and participants useful for running a demo.
 * @param {org.ibm.supplychain.SetupDemo} setupDemo - the SetupDemo transaction
 * @transaction
 */
function setupDemo(setupDemo) {
    var factory = getFactory();
    var NS = 'org.ibm.supplychain';

    // create the manufucturer
    var manufucturer = factory.newResource(NS, 'Manufucturer', 'nestle@email.com');
    var manufucturerAddress = factory.newConcept(NS, 'Address');
    manufucturerAddress.country = 'Nairobi';
    manufucturer.address = manufucturerAddress;
    manufucturer.accountBalance = 0;

    // create the client
    var client = factory.newResource(NS, 'Distributer', 'carrefour@email.com');
    var clientAddress = factory.newConcept(NS, 'Address');
    clientAddress.country = 'Kenya';
    client.address = clientAddress;
    client.accountBalance = 0;

    // create the shipper
    var shipper = factory.newResource(NS, 'Shipper', 'logistics@email.com');
    var shipperAddress = factory.newConcept(NS, 'Address');
    shipperAddress.country = 'Kenya';
    shipper.address = shipperAddress;
    shipper.accountBalance = 0;

    // create the shipper
    var bank = factory.newResource(NS, 'Banker', 'bank@email.com');
    var bankAddress = factory.newConcept(NS, 'Address');
    bankAddress.country = 'Kenya';
    bank.address = shipperAddress;
    bank.accountBalance = 1000000;

    return getParticipantRegistry(NS + '.Manufucturer')
        .then(function (manufucturerRegistry) {
            // add the growers
            return manufucturerRegistry.addAll([manufucturer]);
        })
        .then(function() {
            return getParticipantRegistry(NS + '.Distributer');
        })
        .then(function(distRegistry) {
            // add the importers
            return distRegistry.addAll([client]);
        })
        .then(function() {
            return getParticipantRegistry(NS + '.Shipper');
        })
        .then(function(shipperRegistry) {
            // add the shippers
            return shipperRegistry.addAll([shipper]);
        })
        .then(function() {
            return getParticipantRegistry(NS + '.Banker');
        })
        .then(function(bankRegistry) {
            // add the shippers
            return bankRegistry.addAll([bank]);
        });
    }